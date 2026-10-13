import {createNavigation} from 'next-intl/navigation';
import {locales} from '@/lib/locale';

export const {Link, redirect, usePathname, useRouter} =
  createNavigation({locales});
