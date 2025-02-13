import Image from 'next/image';
import LogoImage from '@/assets/logo.svg';

export default function Logo({
  width = 50,
  height = 50,
}: {
  width?: number;
  height?: number;
}) {
  return <Image src={LogoImage} alt="Logo icon" width={width} height={height} />;
}
