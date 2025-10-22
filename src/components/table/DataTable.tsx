import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
};

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  emptyMessage?: string;
  rowKey?: (row: T, index: number) => string | number;
}

function DataTable<T>({
  data,
  columns,
  loading = false,
  emptyMessage = 'No Data Available',
  rowKey
}: DataTableProps<T>) {

  console.log("DataTable props.columns", columns);

  return (
    <Card className="shadow-card border-table-border bg-premium-white">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-table-border bg-premium-background">
              {columns.map((col) => (
                <th
                  key={String(col.key)}
                  className="text-left p-4 font-medium text-sm text-muted-foreground"
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">
                  Loading...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-6">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              <AnimatePresence>
                {data.map((row, index) => (
                  <motion.tr
                    key={rowKey ? rowKey(row, index): index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="border-b border-table-border hover:bg-table-hover group transition-smooth"
                  >
                    {columns.map((col) => (
                      <td key={String(col.key)} className="p-4">
                        <div className="font-medium text-foreground">
                          {col.render ? col.render(row) : (row[col.key] as React.ReactNode)}
                        </div>
                      </td>
                    ))}
                  </motion.tr>
                ))}
              </AnimatePresence>
            )
            }

          </tbody>
        </table>
      </div>

      {/* {data.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12 text-muted-foreground"
        >
          No users found matching your search criteria.
        </motion.div>
      )} */}
    </Card>
  );
}

export default DataTable