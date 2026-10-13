"use client";

import { usePathname, useRouter } from 'next/navigation';
import { useLocale } from 'next-intl';
import Image from "next/image";
import { Dropdown } from "flowbite-react";
import { AppLocale } from '@/lib/locale';

const Languages = [
  {
    flagname: "O'zbekcha",
    icon: "/images/flag/icon-flag-uz.svg",
    value: "uz",
  },
  {
    flagname: "Russkiy",
    icon: "/images/flag/icon-flag-ru.svg",
    value: "ru",
  },
  {
    flagname: "English",
    icon: "/images/flag/icon-flag-en.svg",
    value: "en",
  },
] as const satisfies ReadonlyArray<{ flagname: string; icon: string; value: AppLocale }>;

export const Language = () => {
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const switchLocale = (nextLocale: AppLocale) => {
    // Replace the locale part of the path
    const newPath = pathname.replace(`/${locale}`, `/${nextLocale}`);
    router.replace(newPath);
  };

  const currentLang = Languages.find((_lang) => _lang.value === locale) || Languages[0];

  return (
    <>
     <div className="relative group/menu">
        <Dropdown
          label=""
          className="w-56  rounded-sm"
          dismissOnClick={false}
          renderTrigger={() => (
            <span className="h-8 w-8 hover:bg-lightprimary rounded-full flex justify-center items-center cursor-pointer group-hover/menu:bg-lightprimary ">
              <Image
                src={currentLang.icon}
                height={35}
                width={32}
                alt="language"
                className="rounded-full h-5 w-5 object-cover cursor-pointer"
              />
            </span>
          )}
        >
          {Languages.map((item, index) => (
            <Dropdown.Item
              className={`flex gap-3 items-center py-3 w-full ${locale === item.value ? 'bg-lightprimary' : ''}`}
              key={index}
              onClick={() => switchLocale(item.value)}
            >
              <Image
                src={item.icon}
                alt="flag"
                height={24}
                width={24}
                className="rounded-full object-cover h-6 w-6"
              />
              <span>{item.flagname}</span>
              {locale === item.value && <span className="ml-auto text-primary">✓</span>}
            </Dropdown.Item>
          ))}
        </Dropdown>
      </div>
    </>
  );
};
