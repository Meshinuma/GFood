import { useMemo, useState } from 'react'
import OrderCard from '../components/OrderCard'
import search_icon from '../assets/icons/search.svg'
import { formatTime } from '../utils/timeFormat'
import { formatDate } from '../utils/dateFormat'
const Orders = () => {
  // format to peso
  const formatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: 'PHP'
  })

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)

    return date.toLocaleString('en-US', {
      month: '2-digit',
      day: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    })
  }

  const orders = [
    {
      id: 'ORD-139',
      service: 'Samgyupsal',
      table: 'T-2',
      status: 'Incoming',
      createdAt: '2026-02-27T04:30:15.9564457+08:00',
      items: [
        { name: 'Chicken Adobo', qty: 4, price: 380 },
        { name: 'Pork BBQ', qty: 2, price: 250 },
        { name: 'Pork BBQ', qty: 2, price: 250 },
        { name: 'Pork BBQ', qty: 2, price: 250 }
      ],
      discount: 0
    },
    {
      id: 'ORD-138',
      table: 'T-1',
      service: 'Food',
      status: 'Incoming',
      createdAt: '2026-02-18T04:52:15.9564457+08:00',
      items: [
        { name: 'Chicken Adobo', qty: 4, price: 380 },
        { name: 'Pork BBQ', qty: 2, price: 250 },
        { name: 'Chicken Adobo', qty: 4, price: 380 },
        { name: 'Pork BBQ', qty: 2, price: 250 },
        { name: 'Pork BBQ', qty: 2, price: 250 },
        { name: 'Chicken Adobo', qty: 4, price: 380 },
        { name: 'Pork BBQ', qty: 2, price: 250 }
      ],
      discount: 0
    },
    {
      id: 'ORD-140',
      service: 'Samgyupsal',
      table: 'T-2',
      status: 'Incoming',
      createdAt: '2026-02-27T04:30:15.9564457+08:00',
      items: [
        { name: 'Chicken Adobo', qty: 4, price: 380 },
        { name: 'Pork BBQ', qty: 2, price: 250 },
        { name: 'Chicken Adobo', qty: 4, price: 380 },
        { name: 'Pork BBQ', qty: 2, price: 250 },
        { name: 'Chicken Adobo', qty: 4, price: 380 },
        { name: 'Pork BBQ', qty: 2, price: 250 }
      ],
      discount: 0
    },
    {
      id: 'ORD-141',
      table: 'T-1',
      service: 'Food',
      status: 'Active',
      createdAt: '2026-02-18T04:52:15.9564457+08:00',
      items: [
        { name: 'Chicken Adobo', qty: 4, price: 380 },
        { name: 'Pork BBQ', qty: 2, price: 250 }
      ],
      discount: 0
    },
    {
      id: 'ORD-142',
      service: 'Samgyupsal',
      table: 'T-2',
      status: 'Incoming',
      createdAt: '2026-02-27T04:30:15.9564457+08:00',
      items: [
        { name: 'Chicken Adobo', qty: 4, price: 380 },
        { name: 'Pork BBQ', qty: 2, price: 250 }
      ],
      discount: 0
    },
    {
      id: 'ORD-143',
      table: 'T-1',
      service: 'Food',
      status: 'Active',
      createdAt: '2026-02-18T04:52:15.9564457+08:00',
      items: [{ name: 'Chicken Adobo', qty: 4, price: 380 }],
      discount: 0
    }
  ]

  const [view, setView] = useState('incoming')
  const [search, setSearch] = useState('')
  const [selectedOrder, setSelectedOrder] = useState(null)

  // Shows the panel
  const handleViewOrder = (order) => {
    const orderStatus = (order.status || '').trim().toLowerCase()
    if (view === 'incoming' && orderStatus !== 'incoming') return
    if (view === 'active' && orderStatus !== 'active') return
    setSelectedOrder(order)
  }

  // Hides the panel
  const handleClosePanel = () => setSelectedOrder(null)

  const filteredOrders = useMemo(() => {
    const q = search.trim().toLowerCase()

    return orders.filter((o) => {
      const status = (o.status || '').trim().toLowerCase()

      if (view === 'incoming' && status !== 'incoming') return false
      if (view === 'active' && status !== 'active') return false

      if (!q) return true
      return (
        o.id.toLowerCase().includes(q) ||
        o.table.toLowerCase().includes(q) ||
        o.service.toLowerCase().includes(q)
      )
    })
  }, [orders, view, search])

  let totalAmount = 0
  if (selectedOrder) {
    totalAmount = selectedOrder.items.reduce((acc, item) => acc + (item.qty * item.price || 0), 0)
    totalAmount -= selectedOrder.discount || 0
  }
  const peso = (n) =>
    `₱${Number(n).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`

  let subtotal = 0
  let discount = 0
  let total = 0

  if (selectedOrder) {
    subtotal = selectedOrder.items.reduce((acc, item) => acc + item.qty * item.price, 0)

    discount = selectedOrder.discount || 0
    total = subtotal - discount
  }

  const selectedStatus = (selectedOrder?.status || '').trim().toLowerCase()
  const showPanel =
    selectedOrder &&
    ((view === 'incoming' && selectedStatus === 'incoming') ||
      (view === 'active' && selectedStatus === 'active'))

  const handlePrintBillOut = () => {
    const printContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Order Summary</title>
          <style>
            @media print {
              @page {
                size: 80mm auto;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 10px;
                font-size: 12px;
              }
            }
            body {
              font-size: 12px;
              padding: 10px;
              max-width: 80mm;
              margin: 0 auto;
              font-family: Arial, sans-serif;
            }
            .header {
              text-align: center;
              margin-bottom: 15px;
            }
            .header h2 {
              margin: 0;
              font-size: 18px;
            }
            .order-info {
              margin-bottom: 10px;
              font-size: 11px;
            }
            .order-info strong {
              display: inline-block;
              min-width: 80px;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin: 15px 0;
            }
            th {
              text-align: left;
              padding: 5px;
              border-bottom: 1px solid #000;
              font-size: 11px;
              font-weight: bold;
            }
            td {
              padding: 5px;
              font-size: 11px;
            }
            .text-right {
              text-align: right;
            }
            .text-center {
              text-align: center;
            }
            .total-row {
              border-top: 2px solid #000;
              font-weight: bold;
              margin-top: 10px;
            }
            .total-row td {
              padding-top: 10px;
              font-size: 13px;
            }
            .separator {
              border-top: 1px dashed #ccc;
              margin: 15px 0;
            }
            .footer {
              text-align: center;
              font-size: 10px;
              color: #666;
              margin-top: 15px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <h2>Order Summary</h2>
          </div>
  
          <div class="order-info">
            <strong>Order #:</strong> ${selectedOrder.id || 'N/A'}<br>
            <strong>Table:</strong> ${selectedOrder.table || 'N/A'}<br>
            <strong>Service:</strong> ${selectedOrder.service || 'N/A'}<br>
            <strong>Date:</strong> ${formatDate(selectedOrder.createdAt)}<br>
            <strong>Time:</strong> ${formatTime(selectedOrder.createdAt)}
         
          </div>

          <div class="separator"></div>

          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th class="text-center">Qty</th>
                <th class="text-right">Price</th>
                <th class="text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
 
              ${
                selectedOrder.items && selectedOrder.items.length > 0
                  ? selectedOrder.items
                      .map((item) => {
                        const quantity = item.qty || 0
                        const price = item.price || 0
                        const itemTotal = quantity * price
                        return `
                    <tr>
                      <td>${item.name || ''}</td>
                       <td class="text-center">${quantity}</td>
                       <td class="text-right">${price.toLocaleString()}</td>
                       <td class="text-right">${itemTotal.toLocaleString()}</td>
                    </tr>
                  `
                      })
                      .join('')
                  : '<tr><td colspan="4" class="text-center">No items</td></tr>'
              }
            </tbody>
            <tfoot>
              <tr class="total-row">
                <td colspan="3" class="text-right"><strong>TOTAL AMOUNT:</strong></td>
                <td class="text-right">${formatter.format(totalAmount || 0)}</td>
              </tr>
            </tfoot>
          </table>

          <div class="separator"></div>

          <div class="footer">
            Thank you for your order!
          </div>
        </body>
      </html>
    `

    // Open print window
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()

      // Wait for content to load, then print
      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()

          // Close the print window after print dialog
          setTimeout(() => {
            if (!printWindow.closed) {
              printWindow.close()
            }
          }, 500)
        }, 250)
      }
    }
  }

  const handlePrintOrderSummary = () => {
    const createdAt = selectedOrder?.createdAt
    const service = selectedOrder?.service || '—'
    const table = (selectedOrder?.table || '—').replace('T-', 'T-')

    const itemsHtml = selectedOrder?.items?.length
      ? selectedOrder.items
          .map((item) => {
            const qty = item.qty ?? 0
            const name = item.name ?? ''
            return `
              <div class="item-row">
                <span class="qty">${qty}</span>
                <span class="name">${name}</span>
              </div>
            `
          })
          .join('')
      : `<div class="empty">No items</div>`

    const printContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Order Slip</title>
        <style>
         @media print {
              @page {
                size: 80mm auto;
                margin: 0;
              }
              body {
                margin: 0;
                padding: 10px;
                font-size: 12px;
              }
            }
            body {
              font-size: 12px;
              padding: 10px;
              max-width: 80mm;
              margin: 0 auto;
              font-family: Arial, sans-serif;
            }

        

          .label{
            color: rgba(255,255,255,.75);
            font-size: 12px;
            margin: 0 0 10px 6px;
            letter-spacing: .2px;
          }

        

          .items{
            margin-top: 6px;
          }

          .item-row{
            display:flex;
            align-items: baseline;
            gap: 10px;
            padding: 6px 0;
            font-size: 18px;
            font-weight: 600;
            color:#111;
          }

          .qty{
            width: 18px;
            text-align: left;
          }

          .name{
            flex: 1;
          }

          .divider{
            border-top: 1px dashed #e5e5e5;
            margin: 14px 0 18px;
          }

          .center{
            text-align:center;
          }

          .service{
            font-weight: 700;
            font-size: 18px;
            color:#111;
            margin-top: 8px;
          }

          .table{
            font-weight: 800;
            font-size: 54px; /* BIG like screenshot */
            margin: 6px 0 2px;
            color:#111;
            letter-spacing: 1px;
          }

          .table-label{
            font-size: 14px;
            color: #777;
            letter-spacing: .2px;
          }

          .datetime{
            text-align:right;
            margin-top: 18px;
            font-size: 12px;
            color: #888;
          }

          .empty{
            font-size: 14px;
            color:#666;
            padding: 10px 0;
          }
        </style>
      </head>

      <body>
        <div class="wrap">

          <div class="card">
            <div class="items">
              ${itemsHtml}
            </div>

            <div class="divider"></div>

            <div class="center">
              <div class="service">${service}</div>
              <div class="table">${table}</div>
              <div class="table-label">Table Number</div>
            </div>

            <div class="datetime">
              ${createdAt ? formatDateTime(createdAt) : ''}
            </div>
          </div>
        </div>
      </body>
    </html>
  `

    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(printContent)
      printWindow.document.close()

      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print()
          setTimeout(() => {
            if (!printWindow.closed) printWindow.close()
          }, 500)
        }, 250)
      }
    }
  }

  return (
    <div>
      {/* Header */}
      <div className="flex flex-1 flex-col gap-2">
        <h2 className="text-2xl font-semibold text-gray-900">Orders</h2>
        <p className="text-gray-500">Manage and track all your orders</p>
      </div>

      {/*  Wrapper becomes 2 columns */}
      <div
        className={`mt-3 grid grid-cols-1 gap-6 ${selectedOrder ? '2xl:grid-cols-[1fr_380px]' : ''}`}
      >
        {/* Main Orders Container */}
        <div className="w-full min-w-0 rounded-2xl bg-white p-5 shadow-sm ring-1 ring-black/5">
          {/* Filter + Search */}
          <div className="m-2 flex gap-3 lg:flex-row lg:items-center">
            {/* Filters */}
            <div className="flex w-full gap-3 lg:w-auto xl:w-auto">
              <button
                onClick={() => {
                  setView('incoming')
                  setSelectedOrder(null)
                }}
                className={
                  view === 'incoming'
                    ? 'flex-1 rounded-xl border border-purple-600 bg-purple-50 px-6 py-2 text-sm font-semibold text-purple-700 lg:flex-none'
                    : 'flex-1 rounded-xl border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-700 lg:flex-none'
                }
              >
                Incoming Orders
              </button>

              <button
                onClick={() => {
                  setView('active')
                  setSelectedOrder(null)
                }}
                className={
                  view === 'active'
                    ? 'flex-1 rounded-xl border border-purple-600 bg-purple-50 px-6 py-2 text-sm font-semibold text-purple-700 lg:flex-none'
                    : 'flex-1 rounded-xl border border-gray-200 bg-white px-6 py-2 text-sm font-medium text-gray-700 lg:flex-none'
                }
              >
                Active Orders
              </button>
            </div>
            {/* Search */}
            <div className="order-1 lg:order-2 w-full lg:ml-auto lg:w-[380px] gap-3">
              <div className="flex items-center gap-2 rounded-xl bg-white px-6 py-2 shadow-sm ring-1 ring-black/5">
                <img src={search_icon} alt="Search" className="h-4 w-4" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full bg-transparent text-sm outline-none"
                  placeholder="Search by order number or table"
                />
              </div>
            </div>
          </div>
          {/* Orders List */}
          <div>
            <h2 className="m-3 font-semibold text-gray-900">
              {view === 'incoming' ? 'Incoming Orders' : 'Active Orders'}
            </h2>

            {filteredOrders.length === 0 ? (
              <p className="m-3 text-sm text-gray-500">No orders found.</p>
            ) : (
              <div
                className={
                  selectedOrder
                    ? 'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  2xl:grid-cols-4'
                    : 'grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5'
                }
              >
                {filteredOrders.map((order) => (
                  <OrderCard key={order.id} order={order} onView={handleViewOrder} />
                ))}
              </div>
            )}
          </div>
        </div>

        {/*  Current Orders Panel  */}
        {showPanel && (
          <>
            {/*  Overlay */}
            <div onClick={handleClosePanel} className="fixed inset-0 z-40 bg-black/30 2xl:hidden" />

            {/*  For Responsive Current Panel - bottom sheet panel */}
            <div className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-y-auto rounded-t-2xl border border-gray-200 bg-white p-5 shadow-xl 2xl:hidden">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-900">Current Orders</h3>
                <button
                  onClick={handleClosePanel}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  Close
                </button>
              </div>

              <p className="mt-3 text-sm text-gray-700">
                <span className="font-medium">Table Number:</span>{' '}
                <span>{selectedOrder.table.replace('T-', '')}</span>
              </p>

              {/* Items + Amount header */}
              <div className="mt-4 flex items-center justify-between text-sm font-semibold text-gray-900">
                <span>Items</span>
                <span>Amount</span>
              </div>

              {/* Items */}
              <div className="mt-3 space-y-4">
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-start justify-between">
                    <div>
                      <p className="text-sm text-gray-900">{item.name}</p>
                      <p className="text-xs text-gray-400">x{item.qty}</p>
                    </div>

                    <p className="text-sm text-gray-900">{peso(item.qty * item.price)}</p>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-6 border-t pt-4">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span>
                  <span>{peso(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Discount</span>
                  <span>{peso(discount)}</span>
                </div>

                <div className="mt-3 flex items-end justify-between">
                  <span className="text-lg font-semibold text-gray-900">Total:</span>
                  <span className="text-lg font-semibold text-gray-900">{peso(total)}</span>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3">
                  {selectedStatus === 'incoming' ? (
                    <>
                      <button
                        onClick={handlePrintBillOut}
                        className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm font-semibold text-gray-800 hover:bg-gray-100 transition"
                      >
                        Bill Out
                      </button>

                      <button className="w-full rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition">
                        Pay
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handlePrintOrderSummary}
                      className="col-span-2 w-full rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition"
                    >
                      Print Order Summary
                    </button>
                  )}
                </div>
              </div>
            </div>

            {/*  Right sticky Current panel for 2xl */}
            <div className="hidden 2xl:block h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-gray-900">Current Orders</h3>
                <button
                  onClick={handleClosePanel}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100"
                >
                  Close
                </button>
              </div>

              <p className="mt-4 text-sm text-gray-700">
                <span className="font-medium">Table Number:</span>{' '}
                <span>{selectedOrder.table.replace('T-', '')}</span>
              </p>
              {selectedStatus === 'active' ? (
                <div className="mt-1 text-sm text-gray-700">
                  {/* Items + Amount header */}
                  <div className="mt-4 flex items-center justify-between text-sm font-semibold text-gray-900">
                    <span>Items</span>
                    <span>Amount</span>
                  </div>

                  {/* Items */}
                  <div className="mt-3 space-y-4">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-400">x{item.qty}</p>
                        </div>
                        <p className="text-sm text-gray-900">{peso(total)}</p>
                      </div>
                    ))}
                  </div>

                  {/* Totals */}
                  <div className="mt-6 border-t pt-4">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal</span>
                      <span>{peso(subtotal)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Discount</span>
                      <span>{peso(discount)}</span>
                    </div>

                    <div className="mt-3 flex items-end justify-between">
                      <span className="text-lg font-semibold text-gray-900">Total:</span>
                      <span className="text-lg font-semibold text-gray-900">{peso(total)}</span>
                    </div>
                    <div className="flex flex-cols gap-3 ">
                      <button
                        onClick={handlePrintBillOut}
                        className="mt-4 w-full rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition"
                      >
                        Bill Out
                      </button>
                      <button className="mt-4 w-full rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition">
                        Pay
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-1 text-sm text-gray-700">
                  {/* Items + Amount header */}
                  <div className="mt-4 flex items-center justify-between text-sm font-semibold text-gray-900">
                    <span>Items</span>
                    <span>Amount</span>
                  </div>
                  {/* Items */}
                  <div className="mt-3 space-y-4">
                    {selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-start justify-between">
                        <div>
                          <p className="text-sm text-gray-900">{item.name}</p>
                          <p className="text-xs text-gray-400">x{item.qty}</p>
                        </div>
                        <p className="text-sm text-gray-900">{peso(total)}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={handlePrintOrderSummary}
                    className="mt-4 w-full rounded-xl bg-purple-600 px-4 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition"
                  >
                    Print Order Summary
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Orders
