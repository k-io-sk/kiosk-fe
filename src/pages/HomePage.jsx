import IntroSection from '@components/home/intro/IntroSection';
import ExhibitionSection from '@components/home/exhibition/ExhibitionSection';
import PerformanceSection from '@components/home/performance/PerformanceSection';
import FestivalSection from '@components/home/festival/FestivalSection';

export default function HomePage() {
  return (
    <>
      <IntroSection />
      <ExhibitionSection />
      <PerformanceSection />
      <FestivalSection />
    </>
  );
}
