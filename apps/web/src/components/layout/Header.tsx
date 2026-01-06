import Link from 'next/link';
import Image from 'next/image';
import logoImg from '../../assets/logo-name-support-desk.png';

interface HeaderProps {
  showUser?: boolean;
}

export function Header({ showUser = true }: HeaderProps) {
  return (
    <header className="px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <Link href="/" className="inline-block">
          <Image
            src={logoImg}
            alt="SupportDesk Pro"
            width={200}
            className="object-contain"
          />
        </Link>
        {showUser && (
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-xs">
              JD
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
