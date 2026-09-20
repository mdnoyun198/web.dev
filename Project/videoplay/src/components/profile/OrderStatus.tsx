'use client'
import { motion } from "framer-motion";
import { ArrowLeft, Package, ChevronRight, X, Check } from 'lucide-react';
import { useEffect, useState } from "react";
import Loading from "@/components/Loading";
import { useRouter } from "next/navigation";
import { useQuery } from '@tanstack/react-query'

type SignupProps = {
    setOpenForm: (open: 'profile') => void;
};

// Mongoose schema অনুযায়ী status এর ফ্লো (Confirmed বাদ দেওয়া হয়েছে)
const STATUS_FLOW = ['Pending', 'Paid', 'Packaging', 'Shipping', 'Delivered'];

export default function OrderStatus({ setOpenForm }: SignupProps) {
    const [orders, setOrders] = useState<any[]>([]);
    const [selectedOrder, setSelectedOrder] = useState<any | null>(null);


    const { data: fetchedData, isLoading } = useQuery({
        queryKey: ['ordersData'],
        queryFn: async () => {
            const res = await fetch('/api/order', { method: "GET" })
            if (!res.ok) throw new Error('Network response was not ok')
            return res.json()
        },
    })

    useEffect(() => {
        if (fetchedData) {
            setOrders(fetchedData)
        }
    }, [fetchedData])

    const formatDate = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
        return new Date(dateString).toLocaleDateString('en-US', options);
    };

    const calculateTotal = (order: any) => {
        const subTotal = order.payment?.totalAmount || 0;
        const tax = order.payment?.deliveryTax || 0;

        return subTotal + tax;
    };

    const router = useRouter()

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-64">
                <Loading />
            </div>
        );
    }

    const handleCancel = async (e: React.MouseEvent, orderId: string) => {
        e.stopPropagation();

        try {
            const res = await fetch('/api/order', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ orderId }),
            });

            if (!res.ok) return;

            // ডাটাবেজে ডিলিট সফল হলে স্টেট থেকে সাথে সাথে সরিয়ে দেওয়া
            setOrders((prevOrders) => prevOrders.filter((order) => order._id !== orderId));

            // যদি সিলেক্টেড ভিউতে থেকে ডিলিট করা হয়, তবে ডিটেইলস মোড বন্ধ করা
            setSelectedOrder((prev: { _id: string } | null) => (prev?._id === orderId ? null : prev));

        } catch (error) {
            console.error("Cancel order error:", error);
        }
    };


    return (
        <motion.div
            initial={{ opacity: 0, x: 1 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            // মোবাইল স্ক্রিনে বর্ডার সরানো হয়েছে এবং নিচে প্যাডিং (pb-20) বাড়ানো হয়েছে
            className="min-h-full mx-auto w-full max-w-4xl sm:min-h-0 sm:rounded-2xl md:border border-neutral-400  dark:border-neutral-700 p-5 flex flex-col"
        >
            {/* Header Section */}
            <div className="flex w-full items-center justify-between pb-4 mb-4 mt-2 px-2 sm:px-0">
                <button
                    onClick={() => {
                        if (selectedOrder) {
                            setSelectedOrder(null);
                        } else {
                            setOpenForm('profile');
                        }
                    }}
                    className="flex cursor-pointer flex-row items-center gap-2 rounded-lg px-1 py-1 text-sm font-medium hover:text-pink transition-colors"
                >
                    <ArrowLeft className="h-5 w-5" />
                    <span>{selectedOrder ? "Back to Orders" : "Back"}</span>
                </button>
                <h2 className="text-lg font-semibold">
                    {selectedOrder ? `Order Details` : "My Orders"}
                </h2>
            </div>

            {/* Content Section (with extra bottom padding for scrolling) */}
            <div className="flex-1 overflow-y-auto px-2 sm:px-0">

                {!selectedOrder ? (
                    /* ---------------- ORDER LIST VIEW ---------------- */
                    <div className="flex flex-col gap-4">
                        {orders.length === 0 ? (
                            <div className="text-center py-10 opacity-70">
                                <Package className="h-12 w-12 mx-auto mb-3 opacity-50" />
                                <p>You have no orders yet.</p>
                            </div>
                        ) : (
                            orders.map((order) => (
                                <div
                                    key={order._id}
                                    onClick={() => setSelectedOrder(order)}
                                    // বক্সের ভেতরের প্যাডিং কমানো হয়েছে (p-3)
                                    className="theme-border rounded-xl p-3 sm:p-4 flex flex-col sm:flex-row sm:items-center justify-between cursor-pointer hover:shadow-md transition-shadow gap-4"
                                >
                                    <div className="flex flex-col gap-3">
                                        <span className="text-xs opacity-70 font-mono">Order ID: #{order._id.slice(0, 8).toUpperCase()}</span>
                                        <span className="font-semibold">{formatDate(order.createdAt)}</span>
                                        <span className="text-sm">Total: <span className="font-bold text-pink">${calculateTotal(order)}</span></span>
                                    </div>

                                    <div className="flex items-center gap-4">
                                        {order.status !== 'Pending' &&

                                            <span className={`px-3 py-1 rounded-full text-xs font-medium border ${order.status === 'Cancelled' ? 'text-red-500' : 'text-pink'}`}>
                                                {order.status}
                                            </span>

                                        }
                                        {order.status === 'Pending' &&
                                            <>
                                                <button
                                                    onClick={() => router.push(`/checkout/${order._id}`)}
                                                    className={`p-3 px-4 rounded-lg text-xs font-medium theme-border ${order.status === 'Cancelled' ? 'text-red-500' : 'text-pink'} cursor-pointer`}>
                                                    Confirm Payment
                                                </button>
                                                <button
                                                    onClick={(e) => handleCancel(e, order._id)}
                                                    className={`p-3 px-4 rounded-lg text-xs font-medium theme-border ${order.status === 'Cancelled' ? 'text-red-500' : 'text-pink'} cursor-pointer`}>
                                                    cancel
                                                </button>
                                            </>
                                        }
                                        <ChevronRight className="h-5 w-5 opacity-50" />
                                    </div>


                                </div>
                            ))
                        )}
                    </div>
                ) : (

                    /* ---------------- ORDER DETAILS VIEW ---------------- */
                    <div className="flex flex-col gap-6">
                        {/* Status Timeline - Completely Normal Flow (No Absolute) */}
                        <div className="theme-border rounded-xl p-4 sm:p-6">
                            <h3 className="font-semibold mb-6">Order Status</h3>

                            {(() => {
                                const isCancelled = selectedOrder.status === 'Cancelled';
                                const statusFlow = ['Paid', 'Packaging', 'Shipping', isCancelled ? 'Cancelled' : 'Delivered'];

                                // ফাঁকা স্ট্রিং ('') হলে -১ (কোনোটাই হাইলাইট হবে না)
                                // ক্যানসেলড হলে শেষ স্টেপ (৩) রেড হাইলাইট হবে
                                const currentIndex = !selectedOrder.status
                                    ? -1
                                    : isCancelled
                                        ? 3
                                        : statusFlow.indexOf(selectedOrder.status);

                                return (
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between w-full mt-2">
                                        {statusFlow.map((step, index) => {
                                            const isCompleted = currentIndex !== -1 && index <= currentIndex;
                                            const isCurrent = index === currentIndex;
                                            const isLast = index === statusFlow.length - 1;
                                            const isLineActive = currentIndex !== -1 && index < currentIndex;
                                            const isStepCancelled = isCancelled && isLast;

                                            return (
                                                <div key={step} className={`flex flex-col sm:flex-row items-start sm:items-center ${isLast ? '' : 'sm:flex-1'}`}>

                                                    {/* Status Node */}
                                                    <div className="flex flex-row sm:flex-col items-center gap-3 sm:gap-1">

                                                        {/* Circle Box */}
                                                        <div className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center text-sm font-bold theme-border transition-colors ${isStepCancelled
                                                            ? 'bg-red-500 text-white border-transparent'
                                                            : isCompleted
                                                                ? 'bg-pink text-white border-transparent'
                                                                : 'border-(--border--color) opacity-60'
                                                            } ${isCurrent && !isStepCancelled ? 'ring-4 ring-[#ff004840]' : ''} ${isStepCancelled ? 'ring-4 ring-red-200' : ''
                                                            }`}>
                                                            {isStepCancelled ? (
                                                                <X className="h-4 w-4" strokeWidth={3} />
                                                            ) : isCompleted ? (
                                                                <Check className="h-4 w-4" strokeWidth={3} />
                                                            ) : (
                                                                index + 1
                                                            )}
                                                        </div>

                                                        {/* Label */}
                                                        <span className={`text-xs font-medium ${isStepCancelled
                                                            ? 'text-red-500 font-bold'
                                                            : isCompleted
                                                                ? 'text-pink'
                                                                : 'opacity-60'
                                                            }`}>
                                                            {step}
                                                        </span>
                                                    </div>

                                                    {/* Connecting Line */}
                                                    {!isLast && (
                                                        <div className="flex sm:flex-1 justify-center sm:w-full pl-3.75 sm:pl-0">
                                                            {/* Mobile Vertical Line */}
                                                            <div className={`sm:hidden w-0.5 h-7 my-1 rounded ${isLineActive ? 'bg-pink' : 'bg-(--border--color) opacity-30'}`}></div>

                                                            {/* Desktop Horizontal Line */}
                                                            <div className={`hidden sm:block h-0.5 w-full mx-4 rounded ${isLineActive ? 'bg-pink' : 'bg-(--border--color) opacity-30'}`}></div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })()}
                        </div>

                        {/* Customer & Delivery Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="theme-border rounded-xl p-3 sm:p-4 flex flex-col gap-2">
                                <h3 className="font-semibold pb-2 mb-2 ">Delivery Information</h3>
                                <p className="text-sm"><span className="opacity-70">Address:</span> {selectedOrder.address}</p>
                                <p className="text-sm"><span className="opacity-70">Phone:</span> {selectedOrder.phone}</p>
                            </div>
                            <div className="theme-border rounded-xl p-3 sm:p-4 flex flex-col gap-2">
                                <h3 className="font-semibold pb-2 mb-2 ">Payment Details</h3>
                                <p className="text-sm"><span className="opacity-70">Product Price:</span> {selectedOrder.payment?.totalAmount}</p>
                                <p className="text-sm"><span className="opacity-70">deliveryTax:</span> {selectedOrder.payment?.deliveryTax}</p>
                                <p className="text-sm"><span className="opacity-70">method:</span> {selectedOrder.payment?.method}</p>
                            </div>
                        </div>

                        {/* Ordered Products */}
                        <div className="theme-border rounded-xl p-3 sm:p-4">
                            <h3 className="font-semibold pb-3 mb-3">Ordered Items</h3>
                            <div className="flex flex-col gap-4">
                                {selectedOrder.products && selectedOrder.products.length > 0 ? (
                                    selectedOrder.products.map((item: any, idx: number) => (
                                        <div
                                            key={item._id || idx}
                                            onClick={() => router.push(`products/${item.url}`)}
                                            className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors group"
                                        >
                                            <div className="flex items-start gap-3">
                                                <div className="w-12 h-12 rounded bg-(--border--color) bg-opacity-20 flex items-center justify-center opacity-70 shrink-0">
                                                    <Package className="h-6 w-6" />
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-sm group-hover:text-pink transition-colors">
                                                        Product ID: {item.productId.slice(-6).toUpperCase()}
                                                    </span>
                                                    <div className="flex flex-wrap gap-2 text-xs opacity-70 mt-1">
                                                        {item.size?.length > 0 && <span>Size: {item.size.join(', ')}</span>}
                                                        {item.colors?.length > 0 && <span>Color: {item.colors.join(', ')}</span>}
                                                        <span>price: ${item.price}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="flex flex-col items-end text-sm">
                                                <span className="font-bold text-pink">${item.price * item.quantity}</span>
                                                <span className="opacity-70">Qty: {item.quantity}</span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <p className="text-sm opacity-70 text-center py-2">No product details available.</p>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </motion.div>
    );
}