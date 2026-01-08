import { Link } from 'react-router-dom';
import { Play, Music, Users, TrendingUp, Award, Globe, Heart, Shield, Zap } from 'lucide-react';

const About = () => {
  const stats = [
    { icon: Users, label: 'Active Users', value: '10M+', description: 'Streaming worldwide' },
    { icon: Play, label: 'Videos', value: '50K+', description: 'Movies & shows' },
    { icon: Music, label: 'Songs', value: '5M+', description: 'Music tracks' },
    { icon: TrendingUp, label: 'Hours Watched', value: '1B+', description: 'Monthly' }
  ];

  const features = [
    {
      icon: Globe,
      title: 'Global Streaming',
      description: 'Access your favorite content anywhere in the world with our adaptive streaming technology.'
    },
    {
      icon: Shield,
      title: 'Secure Platform',
      description: 'Your data and privacy are protected with enterprise-grade security.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Experience buffer-free streaming with our optimized CDN network.'
    },
    {
      icon: Heart,
      title: 'Personalized',
      description: 'AI-powered recommendations tailored to your unique taste.'
    }
  ];

  const team = [
    {
      name: 'Sarah Chen',
      role: 'CEO & Founder',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b332c5ca?w=400&h=400&fit=crop',
      bio: 'Visionary leader with 15+ years in streaming technology.'
    },
    {
      name: 'Marcus Rodriguez',
      role: 'CTO',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: 'Tech architect building the future of entertainment.'
    },
    {
      name: 'Emily Watson',
      role: 'Head of Content',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      bio: 'Curating the best content from around the globe.'
    },
    {
      name: 'David Kim',
      role: 'Lead Designer',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      bio: 'Creating beautiful experiences for millions of users.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-900">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 via-red-900/20 to-pink-900/20" />
        <div className="relative max-w-7xl mx-auto px-6 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                About StreamHub
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              We're revolutionizing entertainment by bringing together the world's best videos and music 
              in one seamless, beautiful experience. Your journey into premium content starts here.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-black/50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-red-600 to-purple-600 rounded-2xl mb-4">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-300 mb-1">{stat.label}</div>
                <div className="text-sm text-gray-500">{stat.description}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">
                <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
                  Our Mission
                </span>
              </h2>
              <p className="text-lg text-gray-300 leading-relaxed mb-6">
                At StreamHub, we believe that great entertainment should be accessible to everyone, 
                everywhere. We're on a mission to break down barriers between content and viewers, 
                creating a world where every story finds its audience.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed mb-8">
                Founded in 2024, we've grown from a small startup to a global platform serving 
                millions of users across 190+ countries. Our commitment to quality, innovation, 
                and user experience drives everything we do.
              </p>
              <div className="flex gap-4">
                <Link 
                  to="/signup" 
                  className="px-8 py-4 bg-gradient-to-r from-red-600 to-purple-600 rounded-full font-semibold hover:from-red-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
                >
                  Start Free Trial
                </Link>
                <Link 
                  to="/subscription" 
                  className="px-8 py-4 border border-gray-600 rounded-full font-semibold hover:border-gray-400 hover:bg-gray-800 transition-all duration-300"
                >
                  View Plans
                </Link>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1551434678117-1757e68d9a7c?w=600&h=400&fit=crop"
                alt="Our mission"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-red-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold shadow-2xl">
                <Award className="inline w-5 h-5 mr-2" />
                Best Streaming Platform 2025
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-black/50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Why Choose StreamHub?
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group">
                <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold text-center mb-16">
            <span className="bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Meet Our Team
            </span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-6">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover border-4 border-gray-800 group-hover:border-purple-500 transition-all duration-300"
                  />
                  <div className="absolute bottom-0 right-1/2 translate-x-1/2 w-8 h-8 bg-green-500 rounded-full border-4 border-gray-900" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{member.name}</h3>
                <p className="text-purple-400 font-semibold mb-3">{member.role}</p>
                <p className="text-gray-400 text-sm leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-900/50 via-purple-900/50 to-pink-900/50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">
            <span className="bg-gradient-to-r from-red-500 to-pink-500 bg-clip-text text-transparent">
              Ready to Start Streaming?
            </span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Join millions of users who've already discovered the StreamHub difference. 
            Start your free trial today - no credit card required.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/signup" 
              className="px-12 py-5 bg-gradient-to-r from-red-600 to-purple-600 rounded-full font-bold text-lg hover:from-red-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-2xl"
            >
              Start Free Trial
            </Link>
            <Link 
              to="/subscription" 
              className="px-12 py-5 bg-gray-800 rounded-full font-bold text-lg hover:bg-gray-700 transition-all duration-300 border border-gray-600 hover:border-gray-400"
            >
              View Pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
