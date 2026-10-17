/**
 * Landing Page View
 * Clean, Dark Midnight Academic & Study Focus
 */
const LandingView = {
  render() {
    return `
      <div class="landing-page" style="padding: 36px 0 20px;">
        
        <!-- Hero Header -->
        <div style="max-width: 820px; margin: 0 auto 36px; text-align: center;">
          <div class="badge badge-verified" style="margin-bottom: 18px; padding: 6px 16px; font-size: 0.82rem;">
            <span>📚 Verified Academic Peer Marketplace</span>
          </div>

          <h1 style="font-size: clamp(2.3rem, 5vw, 3.6rem); font-weight: 800; margin-bottom: 18px; line-height: 1.16; letter-spacing: -0.03em;">
            Study smarter with <span class="gradient-text-study">campus peer support.</span>
          </h1>

          <p style="font-size: clamp(1.02rem, 2vw, 1.18rem); color: var(--text-secondary); max-width: 620px; margin: 0 auto 28px; line-height: 1.6;">
            Delegate permitted formatting, LaTeX typesetting, references, slide decks, and lab prep to verified junior students with escrow security and anonymous privacy.
          </p>

          <div style="display: flex; flex-wrap: wrap; justify-content: center; gap: 14px;">
            <a href="#marketplace" class="btn btn-lg btn-primary" style="box-shadow: var(--shadow-glow);">
              <span>Browse Study Tasks</span>
              <span>→</span>
            </a>
            <a href="#post-task" class="btn btn-lg btn-secondary">
              <span>+ Post a Task</span>
            </a>
          </div>
        </div>

        <!-- Hero Visual Showcase with Study Metrics & Floating Chips -->
        <div class="hero-campus-showcase">
          <img src="/static/images/artistic_aurora_bg.jpg" alt="Campus Study Hub" class="hero-campus-img" />
          
          <!-- Floating live task chips -->
          <div class="hero-floating-chip floating-chip-1">
            <span style="font-size: 1.2rem;">📝</span>
            <div>
              <div style="font-size: 0.84rem; font-weight: 700; color: var(--text-primary);">Engineering Math LaTeX Notes</div>
              <div style="font-size: 0.76rem; color: #34d399; font-weight: 700;">₹400 Escrow Locked</div>
            </div>
          </div>

          <div class="hero-floating-chip floating-chip-2">
            <span style="font-size: 1.2rem;">📐</span>
            <div>
              <div style="font-size: 0.84rem; font-weight: 700; color: var(--text-primary);">SolidWorks 3D CAD Assembly</div>
              <div style="font-size: 0.76rem; color: #a5b4fc; font-weight: 700;">96% Subject Match</div>
            </div>
          </div>

          <div class="hero-campus-overlay">
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 16px; width: 100%;">
              <div style="background: rgba(17, 24, 39, 0.82); backdrop-filter: blur(16px); padding: 16px 20px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.1); box-shadow: var(--shadow-sm);">
                <div style="font-size: 1.6rem; font-weight: 800; color: var(--primary);">1,240+</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary); font-weight: 600;">Verified Students</div>
              </div>
              <div style="background: rgba(17, 24, 39, 0.82); backdrop-filter: blur(16px); padding: 16px 20px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.1); box-shadow: var(--shadow-sm);">
                <div style="font-size: 1.6rem; font-weight: 800; color: #34d399;">₹5.8 Lakh</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary); font-weight: 600;">Escrow Settled</div>
              </div>
              <div style="background: rgba(17, 24, 39, 0.82); backdrop-filter: blur(16px); padding: 16px 20px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.1); box-shadow: var(--shadow-sm);">
                <div style="font-size: 1.6rem; font-weight: 800; color: var(--info);">100%</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary); font-weight: 600;">Anonymous & Secure</div>
              </div>
              <div style="background: rgba(17, 24, 39, 0.82); backdrop-filter: blur(16px); padding: 16px 20px; border-radius: var(--radius-md); border: 1px solid rgba(255,255,255,0.1); box-shadow: var(--shadow-sm);">
                <div style="font-size: 1.6rem; font-weight: 800; color: #fbbf24;">4.9 ★</div>
                <div style="font-size: 0.8rem; color: var(--text-secondary); font-weight: 600;">Peer Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        <!-- 3-Step Simple Academic Flow -->
        <div style="margin-bottom: 48px;">
          <div style="text-align: center; margin-bottom: 26px;">
            <h2 style="font-size: 1.55rem; margin-bottom: 6px;">How It Works</h2>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">Fair, structured peer academic support in three simple steps</p>
          </div>

          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 20px;">
            <div class="card" style="padding: 24px; border-top: 3px solid var(--primary);">
              <div style="width: 42px; height: 42px; border-radius: 12px; background: rgba(99, 102, 241, 0.16); color: var(--primary); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; margin-bottom: 14px;">1</div>
              <h3 style="font-size: 1.15rem; margin-bottom: 6px;">Post or Find Study Tasks</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55;">
                Seniors set page rates or fixed budgets for permitted tasks. Juniors discover matching academic tasks.
              </p>
            </div>

            <div class="card" style="padding: 24px; border-top: 3px solid var(--info);">
              <div style="width: 42px; height: 42px; border-radius: 12px; background: rgba(56, 189, 248, 0.16); color: var(--info); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; margin-bottom: 14px;">2</div>
              <h3 style="font-size: 1.15rem; margin-bottom: 6px;">Private Coordination</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55;">
                Coordinate deliverables and clarify references anonymously with automatic phone and email protection.
              </p>
            </div>

            <div class="card" style="padding: 24px; border-top: 3px solid var(--success);">
              <div style="width: 42px; height: 42px; border-radius: 12px; background: rgba(16, 185, 129, 0.16); color: var(--success); display: flex; align-items: center; justify-content: center; font-weight: 800; font-size: 1.1rem; margin-bottom: 14px;">3</div>
              <h3 style="font-size: 1.15rem; margin-bottom: 6px;">Instant Escrow Payout</h3>
              <p style="font-size: 0.88rem; color: var(--text-secondary); line-height: 1.55;">
                Senior reviews the completed work, approves the deliverable, and escrow funds transfer directly.
              </p>
            </div>
          </div>
        </div>

        <!-- Two Pillars: Seniors & Juniors -->
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; margin-bottom: 44px;">
          <!-- Senior Pillar -->
          <div class="card" style="padding: 28px; border-left: 4px solid var(--primary);">
            <div class="badge badge-assigned" style="margin-bottom: 12px;">For Seniors</div>
            <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Focus on Placements & Projects</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.55; margin-bottom: 16px;">
              Save precious hours by delegating permitted formatting, references, and slide deck structuring to verified juniors.
            </p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;">
              <span class="badge" style="background: rgba(255, 255, 255, 0.05); color: var(--text-secondary); border: 1px solid var(--border-subtle);">₹20/page rates</span>
              <span class="badge" style="background: rgba(255, 255, 255, 0.05); color: var(--text-secondary); border: 1px solid var(--border-subtle);">Escrow protection</span>
              <span class="badge" style="background: rgba(255, 255, 255, 0.05); color: var(--text-secondary); border: 1px solid var(--border-subtle);">Anonymous handle</span>
            </div>
            <a href="#post-task" class="btn btn-primary" style="width: 100%;">Post a Study Task</a>
          </div>

          <!-- Junior Pillar -->
          <div class="card" style="padding: 28px; border-left: 4px solid var(--success);">
            <div class="badge badge-verified" style="margin-bottom: 12px;">For Juniors</div>
            <h3 style="font-size: 1.3rem; margin-bottom: 8px;">Earn Flexible Income on Campus</h3>
            <p style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.55; margin-bottom: 16px;">
              Monetize your typing, LaTeX, CAD, and coding skills during free evenings while gaining exposure to coursework.
            </p>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px;">
              <span class="badge" style="background: rgba(255, 255, 255, 0.05); color: var(--text-secondary); border: 1px solid var(--border-subtle);">Skill match %</span>
              <span class="badge" style="background: rgba(255, 255, 255, 0.05); color: var(--text-secondary); border: 1px solid var(--border-subtle);">Instant payouts</span>
              <span class="badge" style="background: rgba(255, 255, 255, 0.05); color: var(--text-secondary); border: 1px solid var(--border-subtle);">Build reputation</span>
            </div>
            <a href="#marketplace" class="btn btn-success" style="width: 100%;">Browse Open Tasks</a>
          </div>
        </div>

        <!-- Quick Interactive Demo Sandbox Switcher Bar -->
        <div class="card" style="padding: 20px 24px; display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 16px; margin-bottom: 30px; background: rgba(99, 102, 241, 0.06); border: 1px dashed rgba(99, 102, 241, 0.35);">
          <div>
            <div style="font-weight: 700; font-size: 0.95rem; color: var(--text-primary);">⚡ Interactive Evaluator Sandbox</div>
            <div style="font-size: 0.82rem; color: var(--text-secondary);">Switch between pre-configured test profiles with 1 click:</div>
          </div>
          <div style="display: flex; gap: 8px; flex-wrap: wrap;">
            <button class="btn btn-sm btn-primary" onclick="App.switchDemoUser(2)">Senior #A482</button>
            <button class="btn btn-sm btn-success" onclick="App.switchDemoUser(7)">Junior #J194</button>
            <button class="btn btn-sm btn-secondary" onclick="App.switchDemoUser(1)">Admin Console</button>
          </div>
        </div>

      </div>
    `;
  }
};
