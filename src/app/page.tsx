import Navigation from '@/components/Navigation';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

const Home = () => {
	return (
		<div className='min-h-screen bg-background custom-scrollbar'>
			<Navigation />
			<main>
				<HeroSection />
				<AboutSection />
				<SkillsSection />
				<ProjectsSection />
				<BlogSection />
				<ContactSection />
			</main>
			<Footer />
		</div>
	);
};

export default Home;
