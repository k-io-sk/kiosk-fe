import useMainEvents from '@hooks/useMainEvents';
import PageLoader from '../components/global/pageLoader/PageLoader';
import IntroSection from '@components/home/intro/IntroSection';
import ExhibitionSection from '@components/home/exhibition/ExhibitionSection';
import PerformanceSection from '@components/home/performance/PerformanceSection';
import FestivalSection from '@components/home/festival/FestivalSection';

export default function HomePage() {
  const { loading, error, data } = useMainEvents();

  if (loading) return <PageLoader />;
  if (error) return <div>이벤트 데이터를 불러오지 못했습니다.</div>;

  return (
    <>
      <IntroSection />
      <ExhibitionSection items={data.EXHIBITION ?? []} />
      <PerformanceSection items={data.SHOW ?? []} />
      <FestivalSection items={data.FESTIVAL ?? []} />
    </>
  );
}
