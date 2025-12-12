import React from "react"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface filters {
  label: string
  value: string
}

interface TableHeaderProps {
  title: string
  search: string
  onSearch: (value: string) => void
  filterOptions?: filters[]
  selectedFilter?: string
  onFilterChange?: (value: string) => void
}

const TableHeader = React.memo(({ title, search, onSearch, filterOptions, selectedFilter, onFilterChange }: TableHeaderProps) => {
  return (
    <div className="flex flex-col gap-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          {title}
        </h1>
        <p className="text-muted-foreground mt-1"></p>
      </div>

      {/* Controls Row */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        {/* Search - Left Side */}
        <div className="relative w-full sm:w-80 flex items-center">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Search..."
            value={search}
            onChange={(e) => onSearch(e.target.value)}
            className="pl-10 bg-background border-border focus:ring-primary transition-all shadow-sm"
          />
        </div>

        {filterOptions && filterOptions.length > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground whitespace-nowrap">Sort by:</span>
            <Select value={selectedFilter} onValueChange={onFilterChange}>
              <SelectTrigger className="w-[180px] bg-background border-border">
                <SelectValue placeholder="Select option" />
              </SelectTrigger>
              <SelectContent>
                {filterOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
    </div>
  )
})

export default TableHeader
