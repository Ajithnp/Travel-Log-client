import React from 'react'

const VendorWelcomeDashboard = () => {
    return (
        <div className="flex-1 p-4 md:p-6 overflow-auto">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-xl md:text-2xl font-bold mb-4">Welcome to your Dashboard</h2>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                    This is your main content area. The sidebar can be toggled using the button in the top-left corner. On
                    mobile devices, the sidebar appears as an overlay for better space utilization.
                </p>
            </div>
        </div>
    )
}

export default VendorWelcomeDashboard
