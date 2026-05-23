import { useState } from "react";
import { motion } from "framer-motion";

import WalletHero from "../components/wallet-hero";
import TransactionTable from "../components/transaction-table";
import TransactionPagination from "../components/transaction-pagination";
import { PAGE_SIZE, type TxFilter, type WalletFilter } from "../types/types";
import { useUserWalletQuery } from "../hooks/api.hooks";



export default function Wallet() {
    const [filter, setFilter] = useState<TxFilter>("All");
    const [page, setPage] = useState(1);

    let apiFilter: WalletFilter = 'all';
    if (filter === "Credits") apiFilter = 'credit';
    if (filter === "Debits") apiFilter = 'debit';

    const walletQuery = useUserWalletQuery(page, PAGE_SIZE, apiFilter);

    const walletData = walletQuery.data?.data;

    const transactions = walletData?.transactions.data || [];
    const filteredLength = walletData?.transactions.totalDocs || 0;
    const totalPages = walletData?.transactions.totalPages || 1;
    const safePage = Math.min(page, totalPages);

    const handleFilter = (f: TxFilter) => { setFilter(f); setPage(1); };

    return (
        <div className="min-h-screen px-4 sm:px-6 py-12 bg-[#f7f7fb] font-['Inter'] sm:py-8 mt-20">
            <div className="max-w-[90rem] mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}
                    className="mb-6"
                >
                    <div className="flex flex-wrap items-start justify-between gap-3">
                        <div>
                            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">Wallet</h1>
                            <p className="text-sm text-gray-400 mt-0.5">Manage your TripVault balance &amp; transactions</p>
                        </div>
                        <div className="flex items-center gap-2">
                        </div>
                    </div>
                </motion.div>

                {/* Hero & Stat cards */}
                <WalletHero
                    totalBalance={walletData?.balance || 0}
                    totalIn={walletData?.totalCredit || 0}
                    totalOut={walletData?.totalDebit || 0} />

                {/* Transactions card */}
                <motion.div
                    initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.14 }}
                    className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
                >
                    <TransactionTable
                        filter={filter}
                        handleFilter={handleFilter}
                        filteredLength={filteredLength}
                        safePage={safePage}
                        transactions={transactions}
                        isLoading={walletQuery.isLoading}
                    />

                    <TransactionPagination
                        filteredLength={filteredLength}
                        safePage={safePage}
                        pageSize={PAGE_SIZE}
                        totalPages={totalPages}
                        setPage={setPage}
                    />
                </motion.div>
            </div>
        </div>
    );
}