/**
 * Testimonials mapped by service slug (EN slug used as key).
 * Each entry has name, rating, text, and Google Maps review link.
 */
export interface ServiceTestimonial {
  name: string;
  rating: number;
  text: string;
  link: string;
}

export const serviceTestimonials: Record<string, ServiceTestimonial[]> = {
  // Raucherentwöhnung / Stop Smoking
  "stop-smoking": [
    {
      name: "A.B.",
      rating: 5,
      text: "A year ago, I had an intensive hypnosis session with David (I think it was about 5 hours) to quit smoking. He helped me understand why I wanted to quit and exposed the reasons I'd told myself were good for me as lies. The session wasn't more expensive than three months' worth of smoking, so it's already paid for itself. Now, more than a year after being smoke-free, I'd like to thank him again and recommend Mr. Woods to anyone with a smoking problem or addiction.",
      link: "https://www.google.com/maps/reviews/ChdDSUhNMG9nS0VJQ0FnSUNXMHIyNHh3RRAB",
    },
    {
      name: "Nicole Gruber",
      rating: 5,
      text: "I was ready to try hypnosis, even though I'm not really into alternative treatment methods. Since you're fully aware of everything, I felt very relaxed, but sometimes I wondered if it would work. I couldn't believe it. I haven't smoked a single cigarette since.",
      link: "https://www.google.com/maps/reviews/ChZDSUhNMG9nS0VJQ0FnSUMtMi1QU1BnEAE",
    },
    {
      name: "Thorsten Hartmann",
      rating: 5,
      text: "I had hypnosis to quit smoking and I can wholeheartedly recommend David. I felt comfortable from the very first minute and received a warm welcome, as if I were visiting an old friend. The session itself was incredibly relaxing and I left feeling completely free. I haven't smoked since.",
      link: "https://www.google.com/maps/reviews/ChdDSUhNMG9nS0VJQ0FnSUNpcW9yMnF3RRAB",
    },
  ],

  // Abnehmen / Weight Loss
  "weight-loss": [
    {
      name: "Peter Villgrattner",
      rating: 5,
      text: "Hello David, thank you for your help, you were sent by the angels. Regards, Peter.",
      link: "https://www.google.com/maps/reviews/ChZDSUhNMG9nS0VJQ0FnSURjd3FHbVVnEAE",
    },
    {
      name: "Chantal Ianiro",
      rating: 5,
      text: "I wish everyone could see David at least once. After just 40 minutes, he explained my life to me! Trivial things that I'd been subconsciously suppressing for years! He pulled me out of postpartum depression and permanently resolved the things that were generally very difficult for me. It's a masterpiece — what David can do. Nothing is difficult for me anymore, I sleep well, and I'm happy.",
      link: "https://www.google.com/maps/reviews/Ci9DQUlRQUNvZENodHljRjlvT2tsWVkxUm1kMEpzY25sWFNFSjVSa2RRZWtSUVFXYxAB",
    },
    {
      name: "Anita Senti",
      rating: 5,
      text: "It was my first hypnosis experience, and I had the pleasure of working with David J. Woods. I specifically chose him as a professional because of his many years of experience in the psychological and medical fields, along with his relevant certifications. I felt well-supported and safe at all times, and I gained valuable insights. His pragmatic, solution-oriented approach was very helpful.",
      link: "https://www.google.com/maps/reviews/Ci9DQUlRQUNvZENodHljRjlvT204dGRISkxaSGxWTjFSWlFYYzFOMVZNTTBSc2JuYxAB",
    },
  ],

  // Ängste & Phobien / Anxiety
  "anxiety": [
    {
      name: "Theresa Sophia",
      rating: 5,
      text: "For years I struggled with distressing issues from my past that I felt I couldn't change. This was my first hypnosis session, and David helped me finally let go of these issues and feel free of negative feelings. There's no need to be afraid of hypnosis; you're fully aware of everything, but you do need to be willing to participate. For me, hypnosis was a powerful and life-changing experience. I highly recommend it to anyone struggling with anxieties and mental blocks.",
      link: "https://www.google.com/maps/reviews/Ci9DQUlRQUNvZENodHljRjlvT2podFlrNW5XWGR6VVdKbFNURkZXRzlUTkZkTFdHYxAB",
    },
    {
      name: "Noah Hohlfelder",
      rating: 5,
      text: "A few weeks ago, I had the opportunity to try David J. Woods' hypnotherapy services. I was surprised by how profound and effective the sessions were. David listens attentively and asks the right questions, which helped me recognize my inner blocks. The atmosphere was always trusting. Thanks to his support, I was able to overcome some fears. I highly recommend this service!",
      link: "https://www.google.com/maps/reviews/ChdDSUhNMG9nS0VJQ0FnSURmN1BHRTJ3RRAB",
    },
    {
      name: "Anita Senti",
      rating: 5,
      text: "It was my first hypnosis experience… I felt well-supported and safe at all times… His pragmatic, solution-oriented approach was very helpful. Overall, it was a positive experience that left me feeling empowered.",
      link: "https://www.google.com/maps/reviews/Ci9DQUlRQUNvZENodHljRjlvT204dGRISkxaSGxWTjFSWlFYYzFOMVZNTTBSc2JuYxAB",
    },
  ],

  // Stress & Burnout
  "stress-burnout": [
    {
      name: "myitplanet GmbH",
      rating: 5,
      text: "David was highly recommended to me by an acquaintance. Initially, I was somewhat skeptical, but I still sent several employees to him to boost their motivation and mental strength. The results positively surprised me. David works very professionally and addresses individual issues in a targeted manner. Mental blocks were overcome for some employees, and at the same time, team spirit improved significantly.",
      link: "https://www.google.com/maps/reviews/Ci9DQUlRQUNvZENodHljRjlvT2xjeGRrTnNlRFZTV0VGNWRHNXVZVnBCY2xCZlJtYxAB",
    },
    {
      name: "D.M.",
      rating: 5,
      text: "I attended an active hypnosis seminar with David Woods and I'm absolutely thrilled! David is extremely professional, explains complex topics clearly and practically, and has an incredible sensitivity in dealing with people. I was particularly impressed by how effectively he helps to release inner blocks — the change was clearly noticeable in myself and in other participants as well.",
      link: "https://www.google.com/maps/reviews/ChZDSUhNMG9nS0VOYVp3SkRON2V2RFdBEAE",
    },
    {
      name: "Jana Kaprol",
      rating: 5,
      text: "David, with his wonderfully empathetic approach, addressed each of us individually.",
      link: "https://www.google.com/maps/reviews/ChZDSUhNMG9nS0VJQ0FnSUM1OVB6SVZBEAE",
    },
  ],

  // Depressionen & Traumata / Depression
  "depression": [
    {
      name: "Chantal Ianiro",
      rating: 5,
      text: "I wish everyone could see David at least once. After just 40 minutes, he explained my life to me! Trivial things that I'd been subconsciously suppressing for years! He pulled me out of postpartum depression and permanently resolved the things that were generally very difficult for me. It's a masterpiece — what David can do. Nothing is difficult for me anymore, I sleep well, and I'm happy. That was three months ago. A huge thank you and much love to this wonderful person.",
      link: "https://www.google.com/maps/reviews/Ci9DQUlRQUNvZENodHljRjlvT2tsWVkxUm1kMEpzY25sWFNFSjVSa2RRZWtSUVFXYxAB",
    },
    {
      name: "Theresa Sophia",
      rating: 5,
      text: "For years I struggled with distressing issues from my past that I felt I couldn't change. This was my first hypnosis session, and David helped me finally let go of these issues and feel free of negative feelings. For me, hypnosis was a powerful and life-changing experience.",
      link: "https://www.google.com/maps/reviews/Ci9DQUlRQUNvZENodHljRjlvT2podFlrNW5XWGR6VVdKbFNURkZXRzlUTkZkTFdHYxAB",
    },
    {
      name: "Noah Hohlfelder",
      rating: 5,
      text: "I was surprised by how profound and effective the sessions were. David listens attentively and asks the right questions, which helped me recognize my inner blocks. The atmosphere was always trusting. Thanks to his support, I was able to overcome some fears.",
      link: "https://www.google.com/maps/reviews/ChdDSUhNMG9nS0VJQ0FnSURmN1BHRTJ3RRAB",
    },
  ],

  // Adults (general) — use a mix
  "adults": [
    {
      name: "Anita Senti",
      rating: 5,
      text: "It was my first hypnosis experience, and I had the pleasure of working with David J. Woods. I specifically chose him as a professional because of his many years of experience in the psychological and medical fields, along with his relevant certifications. I felt well-supported and safe at all times, and I gained valuable insights. His pragmatic, solution-oriented approach was very helpful. Overall, it was a positive experience that left me feeling empowered.",
      link: "https://www.google.com/maps/reviews/Ci9DQUlRQUNvZENodHljRjlvT204dGRISkxaSGxWTjFSWlFYYzFOMVZNTTBSc2JuYxAB",
    },
    {
      name: "Thorsten Hartmann",
      rating: 5,
      text: "I had hypnosis to quit smoking and I can wholeheartedly recommend David. I felt comfortable from the very first minute and received a warm welcome, as if I were visiting an old friend. The session itself was incredibly relaxing and I left feeling completely free. I haven't smoked since.",
      link: "https://www.google.com/maps/reviews/ChdDSUhNMG9nS0VJQ0FnSUNpcW9yMnF3RRAB",
    },
    {
      name: "D.M.",
      rating: 5,
      text: "I attended an active hypnosis seminar with David Woods and I'm absolutely thrilled! David is extremely professional, explains complex topics clearly and practically, and has an incredible sensitivity in dealing with people. I was particularly impressed by how effectively he helps to release inner blocks.",
      link: "https://www.google.com/maps/reviews/ChZDSUhNMG9nS0VOYVp3SkRON2V2RFdBEAE",
    },
  ],
};

/**
 * Map service slugEN to testimonial key.
 * Children page has no testimonials from the doc.
 */
export function getTestimonialsForService(slugEN: string): ServiceTestimonial[] {
  const map: Record<string, string> = {
    "stop-smoking": "stop-smoking",
    "weight-loss": "weight-loss",
    "anxiety-phobias": "anxiety",
    "stress-burnout": "stress-burnout",
    "depression-trauma": "depression",
    "adults": "adults",
  };
  return serviceTestimonials[map[slugEN] || ""] || [];
}
