import { useState } from "react";
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ALL_BLOGS } from "@/mock-data";
 
const BLOGS_PER_PAGE = 4;
const TOTAL_PAGES    = Math.ceil(ALL_BLOGS.length / BLOGS_PER_PAGE);
 
export function BlogsSection() {
  const [page, setPage] = useState(0);
 
  const visible = ALL_BLOGS.slice(
    page * BLOGS_PER_PAGE,
    page * BLOGS_PER_PAGE + BLOGS_PER_PAGE,
  );
 
  return (
    <section id="blog" className="py-24 bg-gray-50/50">
      <div className="container mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-6">
          <div className="text-center md:text-left">
            <p className="text-orange-500 font-extrabold tracking-wider uppercase text-medium mb-3">Updates</p>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900">Our Best Blogs</h2>
          </div>
 
          <div className="flex items-center gap-3 shrink-0">
 
            <div className="flex gap-2 mx-2">
              {Array.from({ length: TOTAL_PAGES }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setPage(i)}
                  className={`rounded-full transition-all duration-300 ${
                    i === page ? "w-6 h-3 bg-orange-500" : "w-3 h-3 bg-gray-300 hover:bg-orange-300"
                  }`}
                />
              ))}
            </div>
 
            <Button
              variant="outline"
              size="icon"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              className="w-12 h-12 rounded-full border-gray-200 hover:border-orange-500 hover:bg-orange-500 hover:text-white bg-white transition-all shadow-sm disabled:opacity-40"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              disabled={page === TOTAL_PAGES - 1}
              onClick={() => setPage((p) => Math.min(TOTAL_PAGES - 1, p + 1))}
              className="w-12 h-12 rounded-full border-gray-200 hover:border-orange-500 hover:bg-orange-500 hover:text-white bg-white transition-all shadow-sm disabled:opacity-40"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
 
        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 transition-all duration-500">
          {visible.map((blog) => (
            <Card
              key={blog.title}
              className="border-0 shadow-lg hover:shadow-2xl transition-all duration-500 rounded-[2rem] overflow-hidden group cursor-pointer bg-white border-b-4 border-transparent hover:border-orange-500 hover:-translate-y-3"
            >
              <div className="h-56 overflow-hidden relative">
                <div className="absolute top-4 left-4 z-10">
                  <Badge className={`${blog.tagColor} font-bold text-xs border-0 shadow-sm px-3 py-1.5`}>
                    {blog.tag}
                  </Badge>
                </div>
                <img
                  src={blog.img}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
              </div>
 
              <CardContent className="p-7">
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4 font-bold">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center font-black text-[10px] shadow-sm">
                      {blog.author}
                    </div>
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3" /> {blog.date}
                    </span>
                  </div>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3" /> {blog.readTime}
                  </span>
                </div>
 
                <h3 className="text-xl font-bold text-gray-900 leading-snug mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-6 line-clamp-1 leading-relaxed">{blog.excerpt}</p>
 
                <div className="flex items-center text-sm font-black text-orange-500 group/btn uppercase tracking-wide">
                  Read More{" "}
                  <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-2 transition-transform" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}