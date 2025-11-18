import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * AboutComponent: About page
 */
@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  template: `
    <main class="about-page">
      <div class="container">
        <section class="card">
          <h1 class="page-title">About Todo App</h1>

          <div class="content">
            <h2>Welcome</h2>
            <p>
              This is a modern, production-ready Todo application built with Angular 19 and plain
              CSS. It demonstrates best practices for building scalable, accessible, and maintainable
              web applications.
            </p>

            <h2>Features</h2>
            <ul>
              <li>✅ Create, read, update, and delete todos</li>
              <li>✅ Filter by status (All, Active, Completed)</li>
              <li>✅ Search by title or description</li>
              <li>✅ Sort by created date, title, or status</li>
              <li>✅ Bulk actions (toggle all, clear completed)</li>
              <li>✅ Export and import todos as JSON</li>
              <li>✅ Persistent storage with localStorage</li>
              <li>✅ Responsive design for mobile, tablet, and desktop</li>
              <li>✅ Accessible with keyboard navigation and ARIA attributes</li>
              <li>✅ Protected settings page with authentication</li>
            </ul>

            <h2>Technology Stack</h2>
            <ul>
              <li><strong>Framework:</strong> Angular 19 (standalone components)</li>
              <li><strong>Language:</strong> TypeScript</li>
              <li><strong>Styling:</strong> Plain CSS with modern design patterns</li>
              <li><strong>State Management:</strong> RxJS with BehaviorSubjects</li>
              <li><strong>Persistence:</strong> localStorage (easy to replace with API)</li>
              <li><strong>Testing:</strong> Jasmine + Karma</li>
            </ul>

            <h2>Design</h2>
            <p>
              The app uses a clean, modern color palette with a card-based layout. The design
              prioritizes accessibility and usability, with semantic HTML, ARIA labels, and full
              keyboard navigation support.
            </p>

            <h2>Next Steps</h2>
            <ul>
              <li>
                <a href="/">Go back to Todo List</a>
              </li>
              <li>
                <a href="/settings">View Settings (requires login)</a>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </main>
  `,
  styles: `
    .about-page {
      padding: 2rem 1rem;
    }

    .container {
      max-width: 56rem;
      margin: 0 auto;
    }

    .card {
      background-color: #ffffff;
      border: 1px solid #e6e9f2;
      border-radius: 0.5rem;
      box-shadow: 0 1px 3px rgba(11, 18, 32, 0.06);
      padding: 2rem;
    }

    .page-title {
      margin: 0 0 2rem 0;
      font-size: 2rem;
      font-weight: 700;
      color: #0b1220;
    }

    .content h2 {
      margin: 2rem 0 1rem 0;
      font-size: 1.25rem;
      font-weight: 700;
      color: #0b1220;
    }

    .content h2:first-child {
      margin-top: 0;
    }

    .content p {
      margin: 0 0 1rem 0;
      font-size: 1rem;
      color: #556075;
      line-height: 1.6;
    }

    .content ul {
      margin: 0 0 1rem 0;
      padding-left: 1.5rem;
      color: #556075;
      line-height: 1.8;
    }

    .content li {
      margin: 0.5rem 0;
    }

    .content a {
      color: #0f6fff;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.15s ease;
    }

    .content a:hover {
      color: #0d5ce6;
      text-decoration: underline;
    }

    .content a:focus {
      outline: 2px solid #0f6fff;
      outline-offset: 2px;
      border-radius: 2px;
    }

    @media (max-width: 640px) {
      .about-page {
        padding: 1rem;
      }

      .card {
        padding: 1.5rem;
      }

      .page-title {
        font-size: 1.5rem;
      }

      .content h2 {
        font-size: 1.125rem;
      }
    }
  `,
})
export class AboutComponent {}
