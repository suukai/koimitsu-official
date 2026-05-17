import sys
with open('index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

guide_start = -1
guide_end = -1
schedule_end = -1
footer_start = -1

for i, line in enumerate(lines):
    if '<!-- Guide Section -->' in line:
        if guide_start == -1:
            guide_start = i
    if '<!-- Schedule Section -->' in line:
        guide_end = i
    if '<!-- Contact Section -->' in line:
        schedule_end = i
    if '<!-- Profile Modal -->' in line:
        footer_start = i

if guide_start == -1 or guide_end == -1:
    print("Could not find sections")
    sys.exit(1)

guide_content = lines[guide_start:guide_end]

# Extract the two parts of the guide
part1 = []
part2 = []
in_part2 = False

for line in guide_content:
    if '<h3 class="rules-title">' in line:
        in_part2 = True
    
    if in_part2:
        part2.append(line)
    else:
        part1.append(line)

# Remove the section tags and container divs from part1 to clean it up for the modal
part1_clean = []
for line in part1:
    if '<section' in line or '</section>' in line or '<div class="container">' in line or 'Guide<span>はじめて' in line or 'id="guide"' in line or '<!-- Guide Section -->' in line:
        continue
    part1_clean.append(line)

part2_clean = []
for line in part2:
    if '</div>' in line and line.strip() == '</div>':
        # Skip closing divs of container/section at the end of the part2
        continue
    part2_clean.append(line)

part2_clean.append('</div>\n')

hidden_content = """
    <!-- Hidden Guide Contents -->
    <div style="display: none;">
        <div id="content-guide-1">
            """ + ''.join(part1_clean) + """
        </div>
        <div id="content-guide-2">
            """ + ''.join(part2_clean) + """
        </div>
    </div>
    
    <!-- Guide Modal -->
    <div class="modal" id="guide-modal">
        <div class="modal-overlay" id="guide-modal-close-bg"></div>
        <div class="modal-content" style="max-width: 800px;">
            <button class="modal-close" id="guide-modal-close-btn"><i class="fa-solid fa-xmark"></i></button>
            <div class="modal-body" id="guide-modal-body" style="padding: 40px;">
            </div>
        </div>
    </div>
"""

new_guide_section = """
        <!-- Guide Section -->
        <section class="section" id="guide">
            <div class="container">
                <h2 class="section-title fade-in-up">Guide<span>ガイド</span></h2>
                <div class="news-grid">
                    <div class="news-card guide-card-trigger fade-in-up" data-target="content-guide-1" style="cursor: pointer;">
                        <div style="width: 100%; height: 200px; overflow: hidden; border-radius: 8px; margin-bottom: 15px;">
                            <img src="宿圖.jpg" alt="はじめてのライブ参加ガイド" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div class="news-category tag-info">GUIDE</div>
                        <h3 class="news-title">はじめてのライブ参加ガイド 🎀</h3>
                    </div>
                    <div class="news-card guide-card-trigger fade-in-up delay-1" data-target="content-guide-2" style="cursor: pointer;">
                        <div style="width: 100%; height: 200px; overflow: hidden; border-radius: 8px; margin-bottom: 15px;">
                            <img src="宿圖2.jpg" alt="特典会の流れ・レギュレーション" style="width: 100%; height: 100%; object-fit: cover;">
                        </div>
                        <div class="news-category tag-info">RULE</div>
                        <h3 class="news-title">📸 特典会の流れ・レギュレーション</h3>
                    </div>
                </div>
            </div>
        </section>
"""

new_lines = lines[:guide_start] + lines[guide_end:schedule_end] + [new_guide_section] + lines[schedule_end:footer_start] + [hidden_content] + lines[footer_start:]

with open('index.html', 'w', encoding='utf-8') as f:
    f.writelines(new_lines)
