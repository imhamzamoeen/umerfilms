import { getLatestVideos } from '@/lib/videos';
import { videosToProjects } from '@/lib/video-to-project';
import HomePortfolioClient from './HomePortfolioClient';

export default async function HomePortfolioSection() {
  // Fetch latest 6 videos from database only
  const videos = await getLatestVideos(6);
  const projects = videosToProjects(videos);

  return <HomePortfolioClient projects={projects} />;
}
