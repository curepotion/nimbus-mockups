// Grid Bot Animation - Chart.js Implementation
// Extracted from provided HTML example

class GridBotAnimation {
  constructor(containerId) {
    this.containerId = containerId;
    this.chart = null;
    this.rafId = null;
    this.startTime = null;
    this.running = false;
    this.DURATION = 5000;
    this.dataY = [];
    this.eventsPlan = [];
    
    this.init();
  }

  // Generate smooth demo data (range ~ 20..85)
  generateSmoothData(n = 200) {
    const out = [];
    let phase = Math.random() * Math.PI * 2;
    for (let i = 0; i < n; i++) {
      const t = i / (n - 1);
      const y =
        52 +
        18 * Math.sin(phase + t * Math.PI * 1.2) +
        8 * Math.sin(phase * 0.7 + t * Math.PI * 2.7) +
        3.5 * Math.cos(phase * 1.7 + t * Math.PI * 5.1);
      out.push(Math.max(12, Math.min(88, y)));
    }
    return out;
  }

  // Helper interpolation
  lerp(a, b, t) {
    return a + (b - a) * t;
  }

  // Find first crossing for level and direction ("up" | "down") starting from startIndex
  findCrossing(data, level, direction = 'up', startIndex = 0) {
    for (let i = startIndex; i < data.length - 1; i++) {
      const y0 = data[i];
      const y1 = data[i + 1];
      if (direction === 'up' && y0 < level && y1 >= level) {
        const t = (level - y0) / (y1 - y0);
        return { i0: i, i1: i + 1, t, level, direction, idxf: i + t };
      }
      if (direction === 'down' && y0 > level && y1 <= level) {
        const t = (level - y0) / (y1 - y0);
        return { i0: i, i1: i + 1, t, level, direction, idxf: i + t };
      }
    }
    return null;
  }

  // Initialize the animation
  init() {
    this.dataY = this.generateSmoothData(200);
    const labels = this.dataY.map((_, i) => i);

    // Prepare BUY/PROFIT events based on crossings
    this.eventsPlan = [
      { name: 'BUY', level: 40, direction: 'up', shown: false },
      { name: 'PROFIT', level: 80, direction: 'up', shown: false }
    ];
    
    let startIdx = 0;
    for (const ev of this.eventsPlan) {
      const cross = this.findCrossing(this.dataY, ev.level, ev.direction, startIdx);
      if (cross) {
        ev.cross = cross;
        ev.progress = cross.idxf / (this.dataY.length - 1);
        startIdx = Math.ceil(cross.idxf) + 1;
      } else {
        ev.cross = null;
        ev.progress = Infinity;
      }
    }

    this.createChart(labels);
  }

  // Sweep clipping plugin
  get sweepClip() {
    return {
      id: 'sweepClip',
      beforeDatasetsDraw: (chart) => {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        const p = chart.$progress ?? 0;
        chart.$didClip = true;
        ctx.save();
        ctx.beginPath();
        ctx.rect(
          chartArea.left,
          chartArea.top,
          Math.max(0.0001, chartArea.width * p),
          chartArea.height
        );
        ctx.clip();
      },
      afterDatasetsDraw: (chart) => {
        if (chart.$didClip) {
          chart.ctx.restore();
          chart.$didClip = false;
        }
      }
    };
  }

  // Canvas gradient refresh on resize
  get gradientFill() {
    return {
      id: 'gradientFill',
      resize: (chart) => {
        const { ctx, chartArea } = chart;
        if (!chartArea) return;
        const g = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
        g.addColorStop(0, 'rgba(110, 231, 183, 0.20)');
        g.addColorStop(1, 'rgba(110, 231, 183, 0.00)');
        const ds = chart.data.datasets[0];
        ds.backgroundColor = g;
      }
    };
  }

  createChart(labels) {
    const canvas = document.getElementById(this.containerId);
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    this.chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            data: this.dataY,
            borderColor: 'rgba(110, 231, 183, 0.85)',
            borderWidth: 1.5,
            pointRadius: 0,
            tension: 0.42,
            cubicInterpolationMode: 'monotone',
            fill: {
              target: 'origin',
              above: 'rgba(110, 231, 183, 0.05)'
            }
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          legend: { display: false },
          tooltip: { enabled: false }
        },
        scales: {
          x: {
            display: false,
            min: 0,
            max: labels.length - 1
          },
          y: {
            display: false,
            min: 0,
            max: 100
          }
        },
        layout: { padding: 0 },
        elements: {
          line: {
            capBezierPoints: true
          }
        }
      },
      plugins: [this.sweepClip, this.gradientFill]
    });
  }

  // Utility to position cursor and scanline
  positionCursor(progress) {
    const cursorDot = document.getElementById('cursorDot');
    const scanline = document.getElementById('scanline');
    
    if (!cursorDot || !scanline || !this.chart) return;

    const xScale = this.chart.scales.x;
    const yScale = this.chart.scales.y;
    const maxIndex = this.dataY.length - 1;
    const idxf = Math.min(maxIndex, Math.max(0, progress * maxIndex));
    const i0 = Math.floor(idxf);
    const t = idxf - i0;
    const i1 = Math.min(maxIndex, i0 + 1);
    const y = this.lerp(this.dataY[i0], this.dataY[i1], t);
    const x0 = xScale.getPixelForValue(i0);
    const x1 = xScale.getPixelForValue(i1);
    const xp = this.lerp(x0, x1, t);
    const yp = yScale.getPixelForValue(y);

    // Update DOM elements
    cursorDot.style.left = `${xp - 5}px`;
    cursorDot.style.top = `${yp - 5}px`;
    scanline.style.left = `${xp}px`;
  }

  // Event label handling
  showEventLabel(name, xp, yp, placement = 'above') {
    const eventLabel = document.getElementById('eventLabel');
    if (!eventLabel) return;

    eventLabel.textContent = name;
    
    const card = document.querySelector('.grid-bot-animation-card');
    if (!card) return;
    
    const cardRect = card.getBoundingClientRect();
    const clamp = (v, min, max) => Math.max(min, Math.min(max, v));
    const left = clamp(xp, 10, cardRect.width - 10);
    let top = yp;
    if (placement === 'above') top -= 12;
    if (placement === 'below') top += 12;

    eventLabel.style.left = `${left}px`;
    eventLabel.style.top = `${top}px`;

    // Animate in
    eventLabel.classList.remove('opacity-0', 'translate-y-1');
    eventLabel.classList.add('opacity-100', 'translate-y-0');

    setTimeout(() => {
      eventLabel.classList.add('opacity-0', 'translate-y-1');
      eventLabel.classList.remove('opacity-100', 'translate-y-0');
    }, 1100);
  }

  // Compute pixel for event crossing and schedule display
  checkEventTriggers(progress) {
    if (!this.chart) return;
    
    const xScale = this.chart.scales.x;
    const yScale = this.chart.scales.y;

    for (const ev of this.eventsPlan) {
      if (ev.shown || !ev.cross) continue;
      if (progress >= ev.progress) {
        const { i0, i1, t, level } = ev.cross;
        const x0 = xScale.getPixelForValue(i0);
        const x1 = xScale.getPixelForValue(i1);
        const xp = this.lerp(x0, x1, t);
        const yp = yScale.getPixelForValue(level);
        const placement = ev.name === 'BUY' ? 'above' : 'below';
        this.showEventLabel(ev.name, xp, yp, placement);
        ev.shown = true;
      }
    }
  }

  // Reset events
  resetEvents() {
    this.eventsPlan.forEach(e => (e.shown = false));
    const eventLabel = document.getElementById('eventLabel');
    if (eventLabel) {
      eventLabel.classList.add('opacity-0', 'translate-y-1');
      eventLabel.classList.remove('opacity-100', 'translate-y-0');
    }
  }

  // Fade overlay helpers
  fadeCycleOverlay(show) {
    const cycleFade = document.getElementById('cycleFade');
    if (!cycleFade) return;
    
    if (show) {
      cycleFade.classList.add('opacity-100');
    } else {
      cycleFade.classList.remove('opacity-100');
    }
  }

  // Animation loop
  tick = (now) => {
    if (!this.startTime) this.startTime = now;
    const elapsed = now - this.startTime;
    const p = Math.min(1, elapsed / this.DURATION);

    // Update chart progress and redraw
    this.chart.$progress = p;
    this.chart.update('none');

    // Cursor and scanline
    this.positionCursor(p);

    // Trigger labels when crossings are reached
    this.checkEventTriggers(p);

    if (p < 1) {
      this.rafId = requestAnimationFrame(this.tick);
    } else {
      // End of cycle
      this.fadeCycleOverlay(true);
      setTimeout(() => {
        this.fadeCycleOverlay(false);
        this.restart();
      }, 220);
    }
  }

  start() {
    if (this.running) return;
    this.running = true;
    
    const cursorDot = document.getElementById('cursorDot');
    const scanline = document.getElementById('scanline');
    
    if (cursorDot) cursorDot.classList.remove('opacity-0');
    if (scanline) scanline.classList.remove('opacity-0');
    
    this.startTime = null;
    this.rafId = requestAnimationFrame(this.tick);
  }

  stop() {
    this.running = false;
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  restart() {
    this.stop();
    if (this.chart) {
      this.chart.$progress = 0;
      this.chart.update('none');
    }
    this.resetEvents();
    this.start();
  }

  destroy() {
    this.stop();
    if (this.chart) {
      this.chart.destroy();
    }
  }
}

// Export for use
window.GridBotAnimation = GridBotAnimation;
