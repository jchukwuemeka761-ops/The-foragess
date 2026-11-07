import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { NAVEDA_SITE } from './data/naveda.data';
import { Atmosphere } from './services/atmosphere';
import { AtmosphereToolbar } from './components/atmosphere-toolbar';
import { LightboxModal } from './components/lightbox-modal';
import { ReservationModal } from './components/reservation-modal';
import { HomePage } from './pages/home-page';
import { SportsPage } from './pages/sports-page';
import { RestaurantPage } from './pages/restaurant-page';
import { NightlifePage } from './pages/nightlife-page';
import { MartPage } from './pages/mart-page';
import { AboutPage } from './pages/about-page';
import { ContactPage } from './pages/contact-page';

export type PageId = 'home' | 'sports' | 'restaurant' | 'nightlife' | 'mart' | 'about' | 'contact';

@Component({
  selector: 'app-root',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    MatIconModule,
    AtmosphereToolbar,
    LightboxModal,
    ReservationModal,
    HomePage,
    SportsPage,
    RestaurantPage,
    NightlifePage,
    MartPage,
    AboutPage,
    ContactPage
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  readonly site = NAVEDA_SITE;
  readonly atmosphere = inject(Atmosphere);

  readonly currentPage = signal<PageId>('home');
  readonly mobileMenuOpen = signal<boolean>(false);

  readonly lightboxOpen = signal<boolean>(false);
  readonly currentLightboxImage = signal<string>('');

  readonly reservationOpen = signal<boolean>(false);
  readonly reservationInitialTarget = signal<string>('');

  readonly navItems = [
    { id: 'home' as PageId, label: 'Home', badge: '' },
    { id: 'sports' as PageId, label: 'The Arena & Turf', badge: '5-a-Side & Pool' },
    { id: 'restaurant' as PageId, label: 'Restaurant & Menu', badge: '82 Dishes' },
    { id: 'nightlife' as PageId, label: 'VIP Lounge & Band', badge: 'Live Stage' },
    { id: 'mart' as PageId, label: 'Naveda Mart', badge: 'Mall' },
    { id: 'about' as PageId, label: 'The Complex', badge: '' },
    { id: 'contact' as PageId, label: 'Contact & Map', badge: '24/7' }
  ];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.syncHashWithPage();
      window.addEventListener('hashchange', () => this.syncHashWithPage());
    }
  }

  syncHashWithPage(): void {
    const raw = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
    if (['sports', 'arena', 'turf', 'pitch', 'billiards', 'pool'].includes(raw)) {
      this.currentPage.set('sports');
    } else if (['restaurant', 'menu', 'dishes', 'food', 'dining'].includes(raw)) {
      this.currentPage.set('restaurant');
    } else if (['nightlife', 'lounge', 'live-band', 'club', 'bar'].includes(raw)) {
      this.currentPage.set('nightlife');
    } else if (['mart', 'mall', 'supermarket', 'cookware', 'shopping'].includes(raw)) {
      this.currentPage.set('mart');
    } else if (['about', 'complex', 'story', 'vision'].includes(raw)) {
      this.currentPage.set('about');
    } else if (['contact', 'location', 'hours', 'map', 'directions'].includes(raw)) {
      this.currentPage.set('contact');
    } else {
      this.currentPage.set('home');
    }
  }

  navigateTo(page: PageId): void {
    this.currentPage.set(page);
    this.mobileMenuOpen.set(false);
    if (typeof window !== 'undefined') {
      window.location.hash = page === 'home' ? '#/' : `#/${page}`;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  openLightbox(src: string): void {
    this.currentLightboxImage.set(src);
    this.lightboxOpen.set(true);
  }

  closeLightbox(): void {
    this.lightboxOpen.set(false);
  }

  openReservation(target = 'General Reservation'): void {
    this.reservationInitialTarget.set(target);
    this.reservationOpen.set(true);
  }

  closeReservation(): void {
    this.reservationOpen.set(false);
  }
}
