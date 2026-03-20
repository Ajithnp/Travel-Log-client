import { useState } from "react";
import {
  MapPin, Star, Clock, Users, Calendar, Share2, Heart,
  ChevronDown, ChevronUp, Check, X, Mountain, Sunrise,
  Thermometer, Shield, ChevronRight, Award, Truck, Info,
  Wind, Backpack, Camera, Phone, AlertTriangle, ArrowLeft
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const packageData = {
  id: "spiti-winter-trek",
  title: "Spiti Valley Winter Trek",
  tagline: "Experience Spiti Valley in its most dramatic form—hardened in snow, cut off from the world.",
  breadcrumbs: ["Treks", "Adventure", "Spiti Valley Winter Trek"],
  tags: ["Adventure", "Challenging"],
  rating: 4.9,
  reviewCount: 248,
  location: "Spiti Valley, Himachal Pradesh",
  duration: "8 Days / 7 Nights",
  groupSize: "6–12 People",
  operator: {
    name: "Mountain Trails Co.",
    rating: 4.8,
    reviews: 320,
    since: "2014",
    verified: true,
  },
  highlights: [
    "Snow-covered Himalayan monasteries",
    "Frozen Spiti River crossing",
    "Key Monastery & Kibber Village",
    "Kaza to Nako Lake trek",
    "Local homestay experience",
  ],
  batches: [
    { id: 1, start: "Jan 10", end: "Jan 17, 2025", seats: 4, price: 32499, status: "filling" },
    { id: 2, start: "Feb 7", end: "Feb 14, 2025", seats: 8, price: 34999, status: "available" },
    { id: 3, start: "Mar 3", end: "Mar 10, 2025", seats: 0, price: 29999, status: "sold-out" },
  ],
  pricing: {
    base: 32499,
    platformFee: 749,
    total: 33248,
  },
  itinerary: [
    {
      day: 1,
      title: "Arrival & Acclimatization in Shimla",
      activities: [
        { time: "09:00", label: "Meet group at Shimla ISBT Gate 2", type: "meet" },
        { time: "12:00", label: "Introduction briefing at roadside dhaba", type: "info" },
        { time: "16:00", label: "Check-in + Trip Briefing – Review safety guidelines, gear distribution", type: "stay" },
      ],
    },
    {
      day: 2,
      title: "Shimla → Kangle Valley (drive)",
      activities: [],
    },
    {
      day: 3,
      title: "Kangle to Kaza or Nako Lake",
      activities: [],
    },
    {
      day: 4,
      title: "Key Monastery & Kibber Village",
      activities: [],
    },
  ],
  inclusions: [
    "All meals (breakfast, lunch, dinner)",
    "Hotel & guesthouse accommodation",
    "Private vehicle transport included",
    "Expert certified trek guide",
    "Camping gear & sleeping bags",
    "Inner Line Permits",
  ],
  exclusions: [
    "Airfare to/from Shimla",
    "Travel insurance",
    "Personal expenses & shopping",
    "Tips for guides & drivers",
    "Any medical expenses",
  ],
  thingsToCarry: [
    { label: "Warm layered jacket", icon: Wind },
    { label: "Trekking boots", icon: Mountain },
    { label: "UV sunglasses", icon: Camera },
    { label: "Personal medicine", icon: Thermometer },
    { label: "Power bank", icon: Backpack },
    { label: "Water bottle", icon: Truck },
    { label: "Sunscreen SPF 50+", icon: Sunrise },
    { label: "Day backpack", icon: Backpack },
    { label: "Head torch", icon: Camera },
    { label: "Select Food", icon: Info },
  ],
  cancellation: {
    policy: "Moderate Policy",
    rules: [
      { condition: "Cancel 7+ days before", refund: "80% refund" },
      { condition: "Cancel 3–7 days before", refund: "50% refund" },
      { condition: "Cancel within 72 hrs", refund: "No Refund" },
    ],
  },
  reviews: [
    {
      id: 1,
      name: "Priya Sharma",
      avatar: "PS",
      date: "Jan 2025",
      trekDuration: "3 days trek",
      rating: 5,
      text: "Absolutely life-changing experience. The snow leopard sighting on Day 3 was something I'll never forget. Our guide Tarun was incredibly knowledgeable about the local culture and wildlife. The bonfire night at Kibber was magical. 100% would trek again!",
      images: ["bg-emerald-400", "bg-teal-400", "bg-cyan-500"],
    },
    {
      id: 2,
      name: "Rahul Mehta",
      avatar: "RM",
      date: "Feb 2025",
      trekDuration: "5 days trek",
      rating: 4,
      text: "The itinerary was perfect – not too rushed, enough time to soak in each location. Food was surprisingly good for high altitude. The team managed altitude sickness protocols well. Worth every rupee.",
      images: [],
    },
    {
      id: 3,
      name: "Anjali Krishnan",
      avatar: "AK",
      date: "Jan 2025",
      trekDuration: "8 days trek",
      rating: 4,
      text: "Beautiful experience overall. The route through Kinnaur was stunning. Docking one star because the accommodation on Day 5 was below the standard of the rest. Would still highly recommend this trip.",
      images: ["bg-violet-400"],
    },
  ],
  ratingBreakdown: { 5: 195, 4: 38, 3: 10, 2: 3, 1: 2 },
};

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  return (
    <span className={`flex items-center gap-0.5 ${size === "md" ? "gap-1" : ""}`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          className={`fill-current ${size === "md" ? "w-4 h-4" : "w-3 h-3"} ${
            i <= Math.round(rating) ? "text-amber-400" : "text-muted-foreground/30"
          }`}
        />
      ))}
    </span>
  );
}

function ActivityBadge({ type }: { type: string }) {
  const map: Record<string, string> = {
    meet: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
    info: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
    stay: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300",
  };
  const labels: Record<string, string> = { meet: "Meet", info: "Info", stay: "Stay" };
  return (
    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${map[type] ?? map.info}`}>
      {labels[type] ?? type}
    </span>
  );
}

function ItineraryDay({ day, expanded, onToggle }: {
  day: typeof packageData.itinerary[0];
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border border-border rounded-md overflow-hidden transition-all duration-200">
      <button
        onClick={onToggle}
        data-testid={`itinerary-day-${day.day}`}
        className="w-full flex items-center justify-between px-4 py-3 bg-card hover-elevate text-left"
      >
        <div className="flex items-center gap-3">
          <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">
            {day.day}
          </span>
          <span className="font-medium text-sm">{day.title}</span>
        </div>
        {expanded ? <ChevronUp className="w-4 h-4 text-muted-foreground shrink-0" /> : <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />}
      </button>
      {expanded && day.activities.length > 0 && (
        <div className="px-4 pb-4 pt-2 bg-card space-y-3">
          {day.activities.map((act, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <span className="text-xs text-muted-foreground w-12 pt-0.5 shrink-0 font-mono">{act.time}</span>
              <div className="flex-1 flex flex-wrap items-center gap-2">
                <span className="text-sm text-foreground">{act.label}</span>
                <ActivityBadge type={act.type} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function BatchCard({
  batch,
  selected,
  onSelect,
}: {
  batch: typeof packageData.batches[0];
  selected: boolean;
  onSelect: () => void;
}) {
  const statusMap = {
    filling: { label: "Filling Fast", color: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300" },
    available: { label: "Available", color: "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300" },
    "sold-out": { label: "Sold Out", color: "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300" },
  };
  const st = statusMap[batch.status as keyof typeof statusMap];
  return (
    <button
      onClick={batch.status !== "sold-out" ? onSelect : undefined}
      data-testid={`batch-${batch.id}`}
      disabled={batch.status === "sold-out"}
      className={`w-full text-left rounded-md border p-3 transition-all duration-150 ${
        selected
          ? "border-primary bg-accent"
          : "border-border bg-card hover-elevate"
      } ${batch.status === "sold-out" ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div>
          <p className="text-sm font-semibold">
            {batch.start} – {batch.end}
          </p>
          <p className="text-xs text-muted-foreground mt-0.5">
            {batch.status !== "sold-out" ? `${batch.seats} seats left` : "No seats available"}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm font-bold text-foreground">₹{batch.price.toLocaleString()}</p>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${st.color}`}>{st.label}</span>
        </div>
      </div>
    </button>
  );
}

export default function PackageDetails() {
  const [expandedDays, setExpandedDays] = useState<number[]>([1]);
  const [selectedBatch, setSelectedBatch] = useState(packageData.batches[0].id);
  const [saved, setSaved] = useState(false);
  const [showMoreReviews, setShowMoreReviews] = useState(false);

  const toggleDay = (day: number) => {
    setExpandedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const batch = packageData.batches.find((b) => b.id === selectedBatch) ?? packageData.batches[0];
  const totalRatings = Object.values(packageData.ratingBreakdown).reduce((a, b) => a + b, 0);
  const displayedReviews = showMoreReviews ? packageData.reviews : packageData.reviews.slice(0, 2);

  return (
    <div className="min-h-screen bg-background mt-20">
      {/* Top navigation bar */}
      <nav className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-2 flex-wrap">
          <Button variant="ghost" size="sm" data-testid="btn-back" className="gap-1 text-muted-foreground">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back
          </Button>
          <Separator orientation="vertical" className="h-4" />
          <div className="flex items-center gap-1 text-xs text-muted-foreground flex-wrap">
            {packageData.breadcrumbs.map((crumb, i) => (
              <span key={crumb} className="flex items-center gap-1">
                {i > 0 && <ChevronRight className="w-3 h-3" />}
                <span className={i === packageData.breadcrumbs.length - 1 ? "text-foreground font-medium" : "hover:text-foreground cursor-pointer transition-colors"}>
                  {crumb}
                </span>
              </span>
            ))}
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" size="sm" data-testid="btn-share" className="gap-1.5">
              <Share2 className="w-3.5 h-3.5" />
              Share
            </Button>
            <Button
              variant={saved ? "default" : "outline"}
              size="sm"
              data-testid="btn-save"
              onClick={() => setSaved((s) => !s)}
              className="gap-1.5"
            >
              <Heart className={`w-3.5 h-3.5 ${saved ? "fill-current" : ""}`} />
              {saved ? "Saved" : "Save"}
            </Button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        {/* Tags row */}
        <div className="flex items-center gap-2 flex-wrap">
          {packageData.tags.map((tag) => (
            <Badge key={tag} variant="secondary" data-testid={`tag-${tag}`}>
              {tag}
            </Badge>
          ))}
        </div>

        {/* Title & meta */}
        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight" data-testid="package-title">
            {packageData.title}
          </h1>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              by <strong className="text-foreground ml-1">{packageData.operator.name}</strong>
            </span>
            <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {packageData.location}</span>
            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {packageData.duration}</span>
            <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {packageData.groupSize}</span>
            <span className="flex items-center gap-1 font-medium text-foreground">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              {packageData.rating} <span className="text-muted-foreground font-normal">({packageData.reviewCount} reviews)</span>
            </span>
          </div>
        </div>

        {/* Hero image placeholder */}
        <div className="relative w-full h-56 sm:h-72 lg:h-96 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-900" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center">
              <Mountain className="w-10 h-10 text-white" />
            </div>
            <span className="text-white/60 text-sm">Spiti Valley — Winter</span>
          </div>
          <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4 flex gap-2 overflow-x-auto pb-1">
            {["bg-emerald-600", "bg-teal-700", "bg-cyan-700", "bg-slate-600", "bg-indigo-700"].map((color, i) => (
              <div key={i} className={`shrink-0 w-12 h-12 rounded-md ${color} flex items-center justify-center`}>
                <Camera className="w-5 h-5 text-white/70" />
              </div>
            ))}
          </div>
        </div>

        {/* Main 2-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-2 space-y-6">
            {/* Why this trip special */}
            <Card>
              <CardHeader className="pb-3">
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">What Makes This Trip Special</h2>
              </CardHeader>
              <CardContent>
                <p className="text-sm leading-relaxed">{packageData.tagline} This is a rare winter crossing — possible only in January & February when the valley is completely snow-locked.</p>
              </CardContent>
            </Card>

            {/* About This Package */}
            <Card>
              <CardHeader className="pb-3">
                <h2 className="text-lg font-semibold">About This Package</h2>
              </CardHeader>
              <CardContent className="space-y-3 text-sm leading-relaxed text-muted-foreground">
                <p>Experience Spiti Valley in its most dramatic form — hardened in snow, cut off from the world, and absolutely breathtaking. This winter expedition takes you through ancient monasteries, frozen river-crossings, and various villages that few outsiders ever witness.</p>
                <p>The route covers Key Monastery, Kibber, and the frozen Spiti river crossing — experiences reserved only for those brave enough to venture in January and February.</p>
                <div className="pt-2">
                  <h3 className="text-sm font-semibold text-foreground mb-2">Package Highlights</h3>
                  <ul className="space-y-1.5">
                    {packageData.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Day-wise Itinerary */}
            <Card>
              <CardHeader className="pb-3">
                <h2 className="text-lg font-semibold">Day-wise Itinerary</h2>
              </CardHeader>
              <CardContent className="space-y-2">
                {packageData.itinerary.map((day) => (
                  <ItineraryDay
                    key={day.day}
                    day={day}
                    expanded={expandedDays.includes(day.day)}
                    onToggle={() => toggleDay(day.day)}
                  />
                ))}
                <p className="text-xs text-muted-foreground pt-1 text-center">+ 4 more days in itinerary</p>
              </CardContent>
            </Card>

            {/* Inclusions & Exclusions */}
            <Card>
              <CardHeader className="pb-3">
                <h2 className="text-lg font-semibold">Inclusions & Exclusions</h2>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-sm font-semibold text-green-700 dark:text-green-400 mb-3 flex items-center gap-1.5">
                      <Check className="w-4 h-4" /> Included
                    </h3>
                    <ul className="space-y-2">
                      {packageData.inclusions.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm">
                          <Check className="w-3.5 h-3.5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-1.5">
                      <X className="w-4 h-4" /> Not Included
                    </h3>
                    <ul className="space-y-2">
                      {packageData.exclusions.map((item) => (
                        <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                          <X className="w-3.5 h-3.5 text-red-500 dark:text-red-400 shrink-0 mt-0.5" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Things to Carry */}
            <Card>
              <CardHeader className="pb-3">
                <h2 className="text-lg font-semibold">Things to Carry</h2>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {packageData.thingsToCarry.map(({ label, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-1.5 px-3 py-1.5 bg-muted rounded-full text-sm">
                      <Icon className="w-3.5 h-3.5 text-muted-foreground" />
                      <span>{label}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cancellation Policy */}
            <Card>
              <CardHeader className="pb-3">
                <h2 className="text-lg font-semibold">Cancellation Policy</h2>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-md">
                  <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-amber-800 dark:text-amber-300">{packageData.cancellation.policy}</p>
                    {packageData.cancellation.rules.map((rule) => (
                      <p key={rule.condition} className="text-sm text-amber-700 dark:text-amber-400">
                        {rule.condition} → <strong>{rule.refund}</strong>
                      </p>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Reviews */}
            <Card>
              <CardHeader className="pb-3">
                <h2 className="text-lg font-semibold">Traveller Reviews</h2>
              </CardHeader>
              <CardContent className="space-y-5">
                {/* Rating overview */}
                <div className="flex items-start gap-6 flex-wrap">
                  <div className="text-center shrink-0">
                    <p className="text-5xl font-bold">{packageData.rating}</p>
                    <StarRating rating={packageData.rating} size="md" />
                    <p className="text-xs text-muted-foreground mt-1">{packageData.reviewCount} reviews</p>
                  </div>
                  <div className="flex-1 min-w-[160px] space-y-1.5">
                    {[5, 4, 3, 2, 1].map((star) => {
                      const count = packageData.ratingBreakdown[star as keyof typeof packageData.ratingBreakdown] ?? 0;
                      const pct = Math.round((count / totalRatings) * 100);
                      return (
                        <div key={star} className="flex items-center gap-2">
                          <span className="text-xs w-3 text-right text-muted-foreground">{star}</span>
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                          <Progress value={pct} className="flex-1 h-1.5" />
                          <span className="text-xs text-muted-foreground w-8 text-right">{count}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <Separator />
                {/* Individual reviews */}
                <div className="space-y-5">
                  {displayedReviews.map((review) => (
                    <div key={review.id} className="space-y-2" data-testid={`review-${review.id}`}>
                      <div className="flex items-start gap-3">
                        <Avatar className="w-9 h-9 shrink-0">
                          <AvatarFallback className="text-xs">{review.avatar}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-semibold text-sm">{review.name}</p>
                            <span className="text-xs text-muted-foreground">{review.date}</span>
                            <span className="text-xs text-muted-foreground">· {review.trekDuration}</span>
                          </div>
                          <StarRating rating={review.rating} />
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed pl-12">{review.text}</p>
                      {review.images.length > 0 && (
                        <div className="pl-12 flex gap-2 flex-wrap">
                          {review.images.map((color, i) => (
                            <div key={i} className={`w-14 h-14 rounded-md ${color} flex items-center justify-center`}>
                              <Camera className="w-5 h-5 text-white/70" />
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                {!showMoreReviews && packageData.reviews.length > 2 && (
                  <Button variant="outline" className="w-full" onClick={() => setShowMoreReviews(true)} data-testid="btn-load-more-reviews">
                    Load more reviews
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* RIGHT COLUMN — Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 space-y-4">
              <Card className="overflow-hidden">
                {/* Price header */}
                <div className="bg-slate-900 dark:bg-slate-950 px-5 py-4 text-white">
                  <p className="text-xs text-slate-400 mb-1">Starting from</p>
                  <p className="text-3xl font-bold" data-testid="price-display">
                    ₹{packageData.pricing.base.toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">per person</p>
                  <div className="mt-3 flex items-center gap-1.5">
                    <StarRating rating={packageData.rating} />
                    <span className="text-sm font-semibold">{packageData.rating}</span>
                    <span className="text-xs text-slate-400">({packageData.reviewCount} reviews)</span>
                  </div>
                </div>

                <CardContent className="p-4 space-y-4">
                  {/* Select a date */}
                  <div>
                    <div className="flex items-center gap-1.5 mb-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <h3 className="text-sm font-semibold">Select a Date</h3>
                    </div>
                    <div className="space-y-2">
                      {packageData.batches.map((b) => (
                        <BatchCard
                          key={b.id}
                          batch={b}
                          selected={selectedBatch === b.id}
                          onSelect={() => setSelectedBatch(b.id)}
                        />
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Group Type */}
                  <div>
                    <h3 className="text-sm font-semibold mb-2">Group Type</h3>
                    <div className="flex gap-2">
                      {["Solo", "Duo", "Group"].map((type, i) => (
                        <button
                          key={type}
                          data-testid={`group-type-${type}`}
                          className={`flex-1 py-2 rounded-md border text-xs font-medium transition-colors ${
                            i === 2
                              ? "border-primary bg-accent text-accent-foreground"
                              : "border-border bg-card hover-elevate text-foreground"
                          }`}
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Separator />

                  {/* Price breakdown */}
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">₹{batch.price.toLocaleString()} × 1 person</span>
                      <span>₹{batch.price.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Platform fee</span>
                      <span>₹{packageData.pricing.platformFee}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-base">
                      <span>Total</span>
                      <span>₹{(batch.price + packageData.pricing.platformFee).toLocaleString()}</span>
                    </div>
                  </div>

                  <Button className="w-full" size="lg" data-testid="btn-book-now">
                    Book Now
                  </Button>
                </CardContent>
              </Card>

              {/* Tour Operator card */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold mb-3">Tour Operator</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Mountain className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm">{packageData.operator.name}</p>
                      <div className="flex items-center gap-1 flex-wrap">
                        <StarRating rating={packageData.operator.rating} />
                        <span className="text-xs text-muted-foreground">
                          {packageData.operator.rating} · {packageData.operator.reviews} reviews
                        </span>
                      </div>
                      {packageData.operator.verified && (
                        <div className="flex items-center gap-1 mt-1">
                          <Shield className="w-3 h-3 text-blue-500" />
                          <span className="text-xs text-blue-600 dark:text-blue-400">Verified Operator since {packageData.operator.since}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-3 gap-1.5" size="sm" data-testid="btn-contact-operator">
                    <Phone className="w-3.5 h-3.5" />
                    Contact Operator
                  </Button>
                </CardContent>
              </Card>

              {/* Trust badges */}
              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: Shield, label: "Verified Operator" },
                  { icon: Award, label: "Best Price Guarantee" },
                  { icon: Phone, label: "24/7 Support" },
                  { icon: Users, label: "Group Discount" },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 p-2 rounded-md bg-card border border-border text-xs">
                    <Icon className="w-4 h-4 text-primary shrink-0" />
                    <span className="text-muted-foreground leading-tight">{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}