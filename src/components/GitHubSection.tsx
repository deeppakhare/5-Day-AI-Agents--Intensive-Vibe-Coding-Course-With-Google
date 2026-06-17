import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'motion/react';
import { Github, Star, GitFork, Users, BookOpen, Activity } from 'lucide-react';

interface GitHubUser {
  public_repos: number;
  followers: number;
  following: number;
  login: string;
  avatar_url: string;
  html_url: string;
}

interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export default function GitHubSection() {
  const { t } = useTranslation();
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<Repository[]>([]);
  const [loading, setLoading] = useState(true);
  const [languages, setLanguages] = useState<{name: string, count: number, percent: number}[]>([]);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setLoading(true);
        let userData = null;
        let reposData: Repository[] = [];
        
        try {
          const userRes = await fetch('https://api.github.com/users/deeppakhare');
          if (userRes.ok) {
            userData = await userRes.json();
          }
          
          const reposRes = await fetch('https://api.github.com/users/deeppakhare/repos?sort=updated&per_page=100');
          if (reposRes.ok) {
            reposData = await reposRes.json();
          }
        } catch (e) {
          console.warn('Network error fetching GitHub data, falling back to static data.');
        }

        if (!userData || !reposData.length) {
          // Fallback data if API rate limit exceeded or network error
          userData = {
            login: 'deeppakhare',
            avatar_url: 'https://avatars.githubusercontent.com/u/deeppakhare', 
            public_repos: 15,
            followers: 12,
            following: 8,
            html_url: 'https://github.com/deeppakhare'
          };
          reposData = [
            { id: 1, name: 'Civic-Issue-Reporting', html_url: 'https://github.com/deeppakhare', description: 'MERN stack application to report and track civic issues.', stargazers_count: 4, forks_count: 1, language: 'TypeScript', updated_at: new Date().toISOString() },
            { id: 2, name: 'Shroomify', html_url: 'https://github.com/deeppakhare', description: 'An e-commerce platform dedicated to selling mushrooms.', stargazers_count: 3, forks_count: 2, language: 'JavaScript', updated_at: new Date().toISOString() },
            { id: 3, name: 'Deep-s-Portfolio', html_url: 'https://github.com/deeppakhare', description: 'An interactive AI-powered portfolio built with modern web technologies.', stargazers_count: 2, forks_count: 0, language: 'TypeScript', updated_at: new Date().toISOString() }
          ];
        }

        setUser(userData);
        setRepos(reposData.slice(0, 4));

        // Calculate language stats
        const langCounts: Record<string, number> = {};
        let total = 0;
        reposData.forEach(repo => {
          if (repo.language) {
            langCounts[repo.language] = (langCounts[repo.language] || 0) + 1;
            total++;
          }
        });

        let langArray = Object.entries(langCounts)
          .map(([name, count]) => ({
            name,
            count,
            percent: Math.round((count / total) * 100)
          }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 5); // top 5 languages

        if (langArray.length === 0) {
           langArray = [
             { name: 'TypeScript', count: 5, percent: 50 },
             { name: 'JavaScript', count: 3, percent: 30 },
             { name: 'HTML', count: 2, percent: 20 }
           ];
        }

        setLanguages(langArray);
      } catch (error) {
        console.error('Error fetching GitHub data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchGitHubData();
  }, []);

  return (
    <section id="github" className="py-24 relative px-6 z-10 bg-gradient-to-t from-transparent to-black/50">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold text-white flex items-center justify-center gap-4">
            <Github size={40} className="text-[#9d4edd]" />
            GitHub <span className="text-gradient">Activity</span>
          </h2>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-12 h-12 rounded-full border-2 border-white/20 border-t-[#9d4edd] animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Stats Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="glass-panel p-8 rounded-2xl flex flex-col items-center justify-center relative overflow-hidden group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#9d4edd]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              {user && (
                <>
                  <a href={user.html_url} target="_blank" rel="noreferrer" className="block z-10 relative group-hover:scale-105 transition-transform">
                    <img 
                      src={user.avatar_url} 
                      alt={user.login} 
                      className="w-24 h-24 rounded-full border-4 border-[#9d4edd]/30 mb-4 object-cover"
                    />
                    <div className="absolute inset-0 rounded-full ring-2 ring-[#9d4edd] opacity-0 group-hover:opacity-100 transition-opacity animate-pulse" />
                  </a>
                  <h3 className="text-2xl font-bold text-white mb-1 z-10">@{user.login}</h3>
                  <p className="text-white/60 mb-8 z-10 text-sm">GitHub Profile Stats</p>

                  <div className="grid grid-cols-3 gap-6 w-full text-center z-10">
                    <div>
                      <div className="flex items-center justify-center mb-2 text-[#9d4edd]">
                        <BookOpen size={20} />
                      </div>
                      <div className="text-2xl font-mono font-bold text-white">{user.public_repos}</div>
                      <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Repos</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-2 text-[#9d4edd]">
                        <Users size={20} />
                      </div>
                      <div className="text-2xl font-mono font-bold text-white">{user.followers}</div>
                      <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Followers</div>
                    </div>
                    <div>
                      <div className="flex items-center justify-center mb-2 text-[#9d4edd]">
                        <Activity size={20} />
                      </div>
                      <div className="text-2xl font-mono font-bold text-white">{user.following}</div>
                      <div className="text-xs text-white/50 uppercase tracking-widest mt-1">Following</div>
                    </div>
                  </div>
                </>
              )}
            </motion.div>

            {/* Languages Chart */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-8 rounded-2xl"
            >
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Top Languages</h3>
              <div className="space-y-6">
                {languages.map((lang, idx) => (
                  <div key={lang.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white/90 font-medium">{lang.name}</span>
                      <span className="text-white/50 font-mono text-sm">{lang.percent}%</span>
                    </div>
                    <div className="w-full bg-black/50 h-2 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.percent}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (idx * 0.1) }}
                        className="h-full rounded-full bg-gradient-to-r from-[#9d4edd] to-[#e0c3fc]"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Recent Repos */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="glass-panel p-8 rounded-2xl flex flex-col"
            >
              <h3 className="text-xl font-bold text-white mb-6 border-b border-white/10 pb-4">Recent Activity</h3>
              <div className="space-y-4 flex-1 overflow-y-auto pr-2 custom-scrollbar">
                {repos.map(repo => (
                  <a 
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="block p-4 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/5 hover:border-[#9d4edd]/30 transition-all group"
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-[#e0c3fc] font-medium group-hover:text-white transition-colors truncate pr-4">
                        {repo.name}
                      </h4>
                      <span className="text-xs text-white/40 font-mono whitespace-nowrap">
                        {new Date(repo.updated_at).toLocaleDateString()}
                      </span>
                    </div>
                    {repo.description && (
                      <p className="text-sm text-white/60 line-clamp-2 mb-3">{repo.description}</p>
                    )}
                    <div className="flex items-center gap-4 mt-auto">
                      {repo.language && (
                        <div className="flex items-center gap-1.5 text-xs text-white/50">
                          <div className="w-2 h-2 rounded-full bg-[#9d4edd]" />
                          {repo.language}
                        </div>
                      )}
                      <div className="flex items-center gap-1.5 text-xs text-white/50">
                        <Star size={12} /> {repo.stargazers_count}
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-white/50">
                        <GitFork size={12} /> {repo.forks_count}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </section>
  );
}
