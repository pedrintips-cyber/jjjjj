import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { StorySection } from "@/components/StorySection";
import { InfluencersSection } from "@/components/InfluencersSection";
import { RecentDonors } from "@/components/RecentDonors";
import { UpdatesSection } from "@/components/UpdatesSection";
import { CommentsSection } from "@/components/CommentsSection";
import { DonateSection } from "@/components/DonateSection";
import { FooterSection } from "@/components/FooterSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <StorySection />
      <InfluencersSection />
      <RecentDonors />
      <UpdatesSection />
      <CommentsSection />
      <DonateSection />
      <FooterSection />
    </div>
  );
};

export default Index;
