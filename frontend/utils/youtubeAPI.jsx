// YouTube API utility for fetching and summarizing product reviews
export const youtubeAPI = {
  async searchProductReviews(productName, maxResults = 5) {
    try {
      // Simulate YouTube search API call
      await new Promise(resolve => setTimeout(resolve, 800));

      const mockVideos = [];

      if (
        productName.toLowerCase().includes("samsung") &&
        productName.toLowerCase().includes("s24")
      ) {
        mockVideos.push(
          {
            id: "samsung_s24_1",
            title: "Samsung Galaxy S24 Ultra Review - The Ultimate Camera Phone?",
            channelTitle: "MKBHD",
            thumbnail:
              "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300",
            url: "https://youtube.com/watch?v=samsung_s24_review",
            viewCount: "3.2M views",
            duration: "15:42",
            publishedAt: "2024-02-01"
          },
          {
            id: "samsung_s24_2",
            title: "Galaxy S24 Ultra Camera Test - 200MP vs iPhone 15 Pro Max",
            channelTitle: "Peter McKinnon",
            thumbnail:
              "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300",
            url: "https://youtube.com/watch?v=s24_camera_test",
            viewCount: "1.8M views",
            duration: "12:33",
            publishedAt: "2024-02-05"
          },
          {
            id: "samsung_s24_3",
            title: "S24 Ultra After 30 Days - Real World Performance",
            channelTitle: "Dave2D",
            thumbnail:
              "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=300",
            url: "https://youtube.com/watch?v=s24_30days",
            viewCount: "2.1M views",
            duration: "11:28",
            publishedAt: "2024-02-15"
          }
        );
      } else {
        mockVideos.push(
          {
            id: "video1",
            title: `${productName} Review - Detailed Analysis`,
            channelTitle: "Tech Reviewer",
            thumbnail:
              "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300",
            url: "https://youtube.com/watch?v=sample1",
            viewCount: "1.2M views",
            duration: "12:45",
            publishedAt: "2024-01-15"
          },
          {
            id: "video2",
            title: `${productName} Unboxing & First Impressions`,
            channelTitle: "Gadget Guru",
            thumbnail:
              "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300",
            url: "https://youtube.com/watch?v=sample2",
            viewCount: "850K views",
            duration: "8:30",
            publishedAt: "2024-01-20"
          },
          {
            id: "video3",
            title: `${productName} vs Competition - Which to Buy?`,
            channelTitle: "Tech Comparison",
            thumbnail:
              "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=300",
            url: "https://youtube.com/watch?v=sample3",
            viewCount: "650K views",
            duration: "15:20",
            publishedAt: "2024-01-25"
          }
        );
      }

      return {
        success: true,
        videos: mockVideos.slice(0, maxResults)
      };
    } catch (error) {
      console.error("YouTube search error:", error);
      return {
        success: false,
        error: "Unable to fetch YouTube reviews"
      };
    }
  },

  async summarizeVideoContent(videoId, videoTitle) {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      if (videoId.includes("samsung_s24")) {
        const s24Summaries = {
          samsung_s24_1:
            "Comprehensive review highlighting the S24 Ultra's exceptional 200MP camera system, improved S Pen functionality, and titanium build quality.",
          samsung_s24_2:
            "Camera comparison showing S24 Ultra excels in zoom and low-light performance compared to competitors.",
          samsung_s24_3:
            "30-day real-world usage review covering performance, battery life, and AI features."
        };

        const summary =
          s24Summaries[videoId] ||
          "Detailed analysis of Samsung Galaxy S24 Ultra features.";

        return {
          success: true,
          summary,
          keyPoints: this.extractKeyPoints(summary)
        };
      }

      const summary = this.generateMockSummary(videoTitle);

      return {
        success: true,
        summary,
        keyPoints: this.extractKeyPoints(summary)
      };
    } catch (error) {
      console.error("Video summarization error:", error);
      return {
        success: false,
        error: "Unable to summarize video content"
      };
    }
  },

  generateMockSummary(videoTitle) {
    const lowerTitle = videoTitle.toLowerCase();

    if (lowerTitle.includes("iphone")) {
      return "Review focusing on performance, camera upgrades, and build quality with balanced pros and cons.";
    }

    if (lowerTitle.includes("macbook") || lowerTitle.includes("laptop")) {
      return "In-depth laptop review covering performance benchmarks, battery life, and daily usability.";
    }

    return "Professional review discussing key features, strengths, weaknesses, and overall value.";
  },

  extractKeyPoints(summary) {
    return summary
      .split(".")
      .filter(Boolean)
      .slice(0, 3)
      .map(s => s.trim() + ".");
  },

  async getVideoAnalytics(videoId) {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));

      return {
        success: true,
        analytics: {
          sentiment: Math.random() > 0.3 ? "positive" : "neutral",
          rating: (Math.random() * 2 + 3).toFixed(1),
          trustScore: Math.floor(Math.random() * 30 + 70),
          keyMentions: [
            "battery life",
            "camera quality",
            "performance",
            "build quality",
            "value"
          ]
        }
      };
    } catch (error) {
      console.error("Video analytics error:", error);
      return { success: false };
    }
  }
};
