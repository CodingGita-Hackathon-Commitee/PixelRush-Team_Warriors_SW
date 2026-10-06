const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.html'));

const sidebarAdditions = `      <div class="sidebar-action">
        <a href="add-expense.html" class="btn btn-purple btn-full">+ Add Expense</a>
      </div>

      <div class="sidebar-section">
        <span class="section-title">MY GROUPS</span>
        <ul class="group-quicklinks">
          <li><a href="group-details.html"><span class="bullet"></span> Goa Trip</a></li>
          <li><a href="flatmates-details.html"><span class="bullet"></span> Flatmates</a></li>
          <li><a href="birthday-details.html"><span class="bullet"></span> Birthday Party</a></li>
        </ul>
        <a href="create-group.html" class="add-group-link">+ Create Group</a>
      </div>`;

const backButtonHtml = `      <div style="margin-bottom: 15px;">
        <button onclick="history.back()" class="btn btn-outline" style="padding: 6px 12px; font-size: 13px;">&larr; Back</button>
      </div>`;

for (const file of files) {
  let content = fs.readFileSync(path.join(pagesDir, file), 'utf8');

  // 1. Add sidebar sections if not present
  if (!content.includes('class="sidebar-action"')) {
    content = content.replace(/<\/nav>/, `</nav>\n\n${sidebarAdditions}`);
  }

  // 2. Add back button right after <main class="main-content"> if not present
  if (!content.includes('onclick="history.back()"')) {
    content = content.replace(/(<main class="main-content"[^>]*>)/, `$1\n${backButtonHtml}`);
  }
  
  // 3. QR Code width adjustment in make-payment.html
  if (file === 'make-payment.html') {
    content = content.replace(/max-width: 250px;/, 'max-width: 320px; width: 100%;');
  }

  fs.writeFileSync(path.join(pagesDir, file), content);
  console.log(`Updated ${file}`);
}
