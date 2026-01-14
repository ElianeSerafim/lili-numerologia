
import React from 'react';
import { Instagram, ArrowUpRight } from 'lucide-react';

interface InstagramFeedProps {
  handle: string;
  url: string;
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({ handle, url }) => {
  const mockImages = [
    'https://images.unsplash.com/photo-1533154683836-84ea7a0bc310?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1515462277126-2dd0c162007a?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1599240175371-2950552b827e?auto=format&fit=crop&q=80&w=400',
    'https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&q=80&w=400',
  ];

  return (
    <section className="bg-white py-24 border-t border-[#8A968815]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-[#795663] text-[10px] uppercase tracking-[0.5em] font-black mb-4 block">Instagram</span>
            <h2 className="text-4xl md:text-5xl font-serif text-[#283D3B]">Acompanhe a Jornada Diária</h2>
          </div>
          <a 
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 text-[#283D3B] font-bold tracking-[0.2em] text-[11px] uppercase"
          >
            Siga {handle}
            <div className="w-12 h-12 rounded-full border border-[#D9BCAF30] flex items-center justify-center group-hover:bg-[#D9BCAF] group-hover:border-transparent transition-all">
              <Instagram size={18} className="group-hover:text-white transition-colors" />
            </div>
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {mockImages.map((img, i) => (
            <a 
              key={i}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative aspect-square overflow-hidden rounded-2xl group"
            >
              <img 
                src={img} 
                alt={`Instagram Post ${i + 1}`} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-[#283D3B]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <ArrowUpRight className="text-white" size={24} />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
