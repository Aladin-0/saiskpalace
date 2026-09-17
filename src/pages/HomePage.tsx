import { HeroSection } from '../components/HeroSection';
import { ExperiencesSection } from '../components/ExperiencesSection';
import { LocationSection } from '../components/LocationSection';
import { AmenitiesSection } from '../components/AmenitiesSection';
import { ReviewsSection } from '../components/ReviewsSection';
import { PilgrimageGuideSection } from '../components/PilgrimageGuideSection';
import { FAQSection } from '../components/FAQSection';
import { VideoGallerySection } from '../components/VideoGallerySection';
import { ExperienceItem, SearchParams, TravelTab } from '../types';

interface HomePageProps {
  searchParams: SearchParams;
  onUpdateParams: (params: Partial<SearchParams>) => void;
  onSearch: () => void;
  onSelectExperience: (item: ExperienceItem) => void;
  onOpenCuratedTours: (tab: TravelTab) => void;
  onOpenTempleSchedule: () => void;
  onOpenSiteDetail: (siteName: string) => void;
}

export function HomePage({
  searchParams,
  onUpdateParams,
  onSearch,
  onSelectExperience,
  onOpenCuratedTours,
  onOpenTempleSchedule,
  onOpenSiteDetail
}: HomePageProps) {
  return (
    <>
      <HeroSection
        searchParams={searchParams}
        onUpdateParams={onUpdateParams}
        onSearch={onSearch}
      />
      <ExperiencesSection
        onSelectExperience={onSelectExperience}
        onOpenCuratedTours={onOpenCuratedTours}
      />
      <VideoGallerySection />
      <LocationSection />
      <AmenitiesSection />
      <ReviewsSection />
      <PilgrimageGuideSection
        onOpenTempleSchedule={onOpenTempleSchedule}
        onOpenSiteDetail={onOpenSiteDetail}
      />
      <FAQSection />
    </>
  );
}
