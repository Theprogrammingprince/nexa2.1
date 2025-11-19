import { Star } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  course: string;
}

const Review = () => {
  const reviews: Review[] = [
    {
      id: 1,
      name: 'Chioma Okafor',
      role: 'Student',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      content: 'NEXA completely transformed my exam preparation. The practice tests are incredibly accurate and helped me understand the real exam format. I scored 87% on my first attempt!',
      rating: 5,
      course: 'Computer Science',
    },
    {
      id: 2,
      name: 'Ejiro Adeleke',
      role: 'Student',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      content: 'The progress tracking feature is amazing. I could see exactly where I was weak and focus on those areas. NEXA gave me the confidence I needed to excel.',
      rating: 5,
      course: 'Business Administration',
    },
    {
      id: 3,
      name: 'Kelechi Mbatha',
      role: 'Student',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      content: 'As a working student, NEXA\'s flexible timing and mobile access made studying possible. The timed sessions prepared me perfectly for the real exam pressure.',
      rating: 5,
      course: 'Accounting & Finance',
    },
    {
      id: 4,
      name: 'Amara Eze',
      role: 'Student',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      content: 'The instant feedback after each practice test was incredibly helpful. I learned from my mistakes immediately and saw significant improvement in just 2 weeks!',
      rating: 5,
      course: 'English Literature',
    },
    {
      id: 5,
      name: 'David Okonkwo',
      role: 'Student',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
      content: 'NEXA\'s comprehensive course coverage gave me peace of mind. I knew I was studying the right material for the NOUN exam standard. Highly recommend!',
      rating: 5,
      course: 'Software Engineering',
    },
    {
      id: 6,
      name: 'Zainab Ibrahim',
      role: 'Student',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
      content: '24/7 support from the NEXA team was fantastic. Whenever I had questions, they responded quickly and thoroughly. This platform truly cares about student success.',
      rating: 5,
      course: 'Social Sciences',
    },
    {
      id: 7,
      name: 'Tunde Aladele',
      role: 'Student',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
      content: 'The difference between NEXA and other platforms is clear. The questions are harder, which made the real exam seem easier. Smart study with NEXA works!',
      rating: 5,
      course: 'Marketing & Entrepreneurship',
    },
    {
      id: 8,
      name: 'Blessing Obi',
      role: 'Student',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
      content: 'I improved from 65% to 92% in just one month using NEXA. The structured approach and quality materials made all the difference in my academic journey.',
      rating: 5,
      course: 'Early Childhood Education',
    },
  ];

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gradient-to-br from-gray-50 via-white to-teal-50/30 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20 animate-fade-in">
          <div className="inline-block mb-4">
            <span className="text-teal-700 font-semibold text-xs uppercase tracking-wider bg-teal-100 px-4 py-1.5 rounded-lg">
              ⭐ Student Testimonials
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
            Loved by <span className="bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">1000+ Students</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Real feedback from students who have transformed their exam preparation and achieved outstanding results with NEXA
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative overflow-hidden">
          {/* Gradient overlays for fade effect */}
          <div className="absolute left-0 top-0 z-20 w-12 md:w-20 h-full bg-gradient-to-r from-gray-50 via-gray-50/50 to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 z-20 w-12 md:w-20 h-full bg-gradient-to-l from-gray-50 via-gray-50/50 to-transparent pointer-events-none"></div>

          {/* Carousel Container */}
          <div className="flex gap-6 animate-scroll">
            {/* Original reviews */}
            {reviews.map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-full sm:w-96 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="p-8 h-full flex flex-col">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-700 text-base leading-relaxed mb-6 flex-grow">
                    "{review.content}"
                  </p>

                  {/* Divider */}
                  <div className="border-t border-gray-100 pt-6 mb-0"></div>

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-teal-200"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <p className="text-xs text-gray-500">{review.course}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Duplicate reviews for seamless loop */}
            {reviews.map((review) => (
              <div
                key={`${review.id}-duplicate`}
                className="flex-shrink-0 w-full sm:w-96 bg-white rounded-2xl border border-gray-200 shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group"
              >
                <div className="p-8 h-full flex flex-col">
                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className="text-yellow-400 fill-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Review Content */}
                  <p className="text-gray-700 text-base leading-relaxed mb-6 flex-grow">
                    "{review.content}"
                  </p>

                  {/* Divider */}
                  <div className="border-t border-gray-100 pt-6 mb-0"></div>

                  {/* User Info */}
                  <div className="flex items-center gap-4">
                    <img
                      src={review.image}
                      alt={review.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-teal-200"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{review.name}</h4>
                      <p className="text-xs text-gray-500">{review.course}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 animate-fade-in" style={{ animationDelay: '200ms' }}>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="text-3xl font-bold text-teal-600 mb-2">10K+</div>
            <p className="text-sm text-gray-600">Active Students</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="text-3xl font-bold text-cyan-600 mb-2">95%</div>
            <p className="text-sm text-gray-600">Success Rate</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="text-3xl font-bold text-teal-600 mb-2">4.9★</div>
            <p className="text-sm text-gray-600">Average Rating</p>
          </div>
          <div className="bg-white rounded-xl border border-gray-200 p-6 text-center hover:shadow-lg transition-shadow duration-300">
            <div className="text-3xl font-bold text-cyan-600 mb-2">100%</div>
            <p className="text-sm text-gray-600">Satisfaction</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Review;
