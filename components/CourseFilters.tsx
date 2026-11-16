"use client";

type Category = "همه دوره‌ها" | "هوش مصنوعی" | "برنامه‌نویسی" | "رباتیک" | "پایتون" | "سایر";
type SortOrder = "newest" | "oldest" | "default";

const categories: Category[] = ["همه دوره‌ها", "هوش مصنوعی", "برنامه‌نویسی", "رباتیک", "پایتون", "سایر"];

export default function CourseFilters({
  search, setSearch,
  category, setCategory,
  sort, setSort,
}: {
  search: string; setSearch: (v: string) => void;
  category: Category; setCategory: (v: Category) => void;
  sort: SortOrder; setSort: (v: SortOrder) => void;
}) {
  return (
    <div className="filter-stack">
      {/* Box 1: Search */}
      <div className="filter-box">
        <div className="filter-search-wrap">
          <span className="filter-search-icon">🔍</span>
          <input
            className="filter-search-input"
            placeholder="جست‌وجو در دوره‌های Sarobix"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Box 2: Category filter */}
      <div className="filter-box">
        <div className="filter-group-title">
          <span>دسته‌بندی</span>
          <span className="filter-group-icon">◆</span>
        </div>
        <div className="filter-group-divider" />
        <div className="filter-options">
          {categories.map((cat) => (
            <label key={cat} className="filter-radio">
              <span>{cat}</span>
              <input
                type="radio"
                name="category"
                checked={category === cat}
                onChange={() => setCategory(cat)}
              />
            </label>
          ))}
        </div>
      </div>

      {/* Box 3: Sort filter */}
      <div className="filter-box">
        <div className="filter-group-title">
          <span>مرتب‌سازی</span>
          <span className="filter-group-icon">↕</span>
        </div>
        <div className="filter-group-divider" />
        <div className="filter-options">
          <label className="filter-radio">
            <span>جدیدترین</span>
            <input type="radio" name="sort" checked={sort === "newest"} onChange={() => setSort("newest")} />
          </label>
          <label className="filter-radio">
            <span>قدیمی‌ترین</span>
            <input type="radio" name="sort" checked={sort === "oldest"} onChange={() => setSort("oldest")} />
          </label>
          <label className="filter-radio">
            <span>پیش‌فرض</span>
            <input type="radio" name="sort" checked={sort === "default"} onChange={() => setSort("default")} />
          </label>
        </div>
      </div>
    </div>
  );
}
