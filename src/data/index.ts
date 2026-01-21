/**
 * @file Data Barrel Export
 * @description All static data (services, navigation)
 * @searchable services, navigation, data
 *
 * Usage: import { services, mainNavigation, contactInfo } from '@/data'
 */

export { services, getServiceBySlug, getRelatedServices } from './services';
export type { Service } from './services';
export { mainNavigation, footerNavigation, contactInfo } from './navigation';
export type { NavItem } from './navigation';
export { images } from './images';
