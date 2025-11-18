import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

/**
 * FooterComponent: Application footer
 */
@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule],
  template: `
    <footer class="footer">
      <div class="footer__container">
        <div class="footer__section">
          <h4 class="footer__title">Todo App</h4>
          <p class="footer__text">
            A modern, production-ready todo application built with Angular 19.
          </p>
        </div>

        <div class="footer__section">
          <h4 class="footer__title">Links</h4>
          <ul class="footer__links">
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#settings">Settings</a></li>
          </ul>
        </div>

        <div class="footer__section">
          <h4 class="footer__title">Tech Stack</h4>
          <ul class="footer__links">
            <li>Angular 19</li>
            <li>TypeScript</li>
            <li>RxJS</li>
            <li>Responsive CSS</li>
          </ul>
        </div>
      </div>

      <div class="footer__divider"></div>

      <div class="footer__bottom">
        <p class="footer__copyright">
          &copy; 2025 Todo App. Built with <span class="heart">❤</span> and Angular.
        </p>
        <p class="footer__credits">
          This is a demo application showcasing best practices in Angular development.
        </p>
      </div>
    </footer>
  `,
  styles: `
    .footer {
      margin-top: 4rem;
      border-top: 1px solid #e6e9f2;
      background-color: #f5f7fb;
      padding: 2rem 1rem;
      font-size: 0.875rem;
      color: #556075;
    }

    .footer__container {
      max-width: 100rem;
      margin: 0 auto 2rem;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;
    }

    .footer__section {
      display: flex;
      flex-direction: column;
      gap: 0.75rem;
    }

    .footer__title {
      margin: 0;
      font-size: 0.9375rem;
      font-weight: 700;
      color: #0b1220;
    }

    .footer__text {
      margin: 0;
      line-height: 1.6;
    }

    .footer__links {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .footer__links a {
      color: #556075;
      text-decoration: none;
      transition: color 0.15s ease;
    }

    .footer__links a:hover {
      color: #0f6fff;
      text-decoration: underline;
    }

    .footer__divider {
      height: 1px;
      background-color: #e6e9f2;
      margin: 1.5rem 0;
    }

    .footer__bottom {
      max-width: 100rem;
      margin: 0 auto;
      text-align: center;
    }

    .footer__copyright {
      margin: 0 0 0.5rem 0;
      font-weight: 600;
      color: #0b1220;
    }

    .heart {
      color: #ef4444;
    }

    .footer__credits {
      margin: 0;
      font-size: 0.8125rem;
      color: #9ca3af;
    }

    @media (max-width: 640px) {
      .footer {
        padding: 1.5rem 1rem;
      }

      .footer__container {
        grid-template-columns: 1fr;
        gap: 1.5rem;
      }

      .footer__bottom {
        text-align: center;
      }
    }
  `,
})
export class FooterComponent {}
