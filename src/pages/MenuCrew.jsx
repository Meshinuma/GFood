import { useMemo, useState } from 'react'
import MenuItemCard from '../components/MenuItemCard'
// Meals
import Menu1 from '../images/Chicken.png'
import Menu2 from '../images/Karekare.png'
import Menu3 from '../images/CrispyPata.png'
import Menu4 from '../images/LechonKawali.png'
import Menu5 from '../images/Inasal.png'
import Menu6 from '../images/BistikTagalog.png'
// Seafood
import Menu7 from '../images/seafood/bangus.png'
import Menu8 from '../images/seafood/mix.png'
import Menu9 from '../images/seafood/sweetandsour.png'
import Menu10 from '../images/seafood/butter.png'
import Menu11 from '../images/seafood/calamares.png'
// Dessert
import Menu12 from '../images/desserts/flan.png'
import Menu13 from '../images/desserts/halo.png'
// Sizzling
import Menu14 from '../images/sizz/pork.png'
import Menu15 from '../images/sizz/beef.png'
import Menu16 from '../images/sizz/chicken.png'
// Beverages
import Menu17 from '../images/bev/cucumber.png'
import Menu18 from '../images/bev/tea.png'
import Menu19 from '../images/bev/calamansi.png'
import Menu20 from '../images/bev/coke.png'
import Menu21 from '../images/bev/sprite.png'
import Menu22 from '../images/bev/water.png'
// Samgyupsal
import Menu23 from '../images/sam/pork.png'
import Menu24 from '../images/sam/beef.png'
// Add Ons
import Menu25 from '../images/add/plain.png'
import Menu26 from '../images/add/garlic.png'
import Menu27 from '../images/add/kimchi.png'
import Menu28 from '../images/add/cheese.png'
import Menu29 from '../images/add/pork.png'
import Menu30 from '../images/add/beef.png'
import check from '../assets/icons/check.svg'

function formatPHP(n) {
  const num = Number(n || 0)
  return `₱${num.toFixed(2)}`
}

export default function MenuCrew() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [search, setSearch] = useState('')
  const [ordersOpen, setOrdersOpen] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(false)
  const [showAnimation, setShowAnimation] = useState(false)
  const [itemID, setItemID] = useState(false)
  const [cart, setCart] = useState({})

  const menuItems = [
    { id: 1, menuImage: Menu1, menuTitle: 'Chicken Adobo', menuCategory: 'Meals', menuPrice: 380 },
    { id: 2, menuImage: Menu2, menuTitle: 'Kare-Kare', menuCategory: 'Meals', menuPrice: 550 },
    { id: 3, menuImage: Menu3, menuTitle: 'Crispy Pata', menuCategory: 'Meals', menuPrice: 720 },
    { id: 4, menuImage: Menu4, menuTitle: 'Lechon Kawali', menuCategory: 'Meals', menuPrice: 480 },
    { id: 5, menuImage: Menu5, menuTitle: 'Chicken Inasal', menuCategory: 'Meals', menuPrice: 420 },
    { id: 6, menuImage: Menu6, menuTitle: 'Bistek Tagalog', menuCategory: 'Meals', menuPrice: 460 },

    {
      id: 7,
      menuImage: Menu7,
      menuTitle: 'Grilled Bangus',
      menuCategory: 'Seafood',
      menuPrice: 460
    },
    {
      id: 8,
      menuImage: Menu8,
      menuTitle: 'Mixed Seafood',
      menuCategory: 'Seafood',
      menuPrice: 520
    },
    {
      id: 9,
      menuImage: Menu9,
      menuTitle: 'Sweet & Sour Fish',
      menuCategory: 'Seafood',
      menuPrice: 560
    },
    {
      id: 10,
      menuImage: Menu10,
      menuTitle: 'Butter Garlic Shrimp',
      menuCategory: 'Seafood',
      menuPrice: 540
    },
    { id: 11, menuImage: Menu11, menuTitle: 'Calamares', menuCategory: 'Seafood', menuPrice: 220 },

    {
      id: 12,
      menuImage: Menu12,
      menuTitle: 'Leche Flan',
      menuCategory: 'Desserts',
      menuPrice: 150
    },
    {
      id: 13,
      menuImage: Menu13,
      menuTitle: 'Halo-Halo Special',
      menuCategory: 'Desserts',
      menuPrice: 220
    },

    {
      id: 14,
      menuImage: Menu14,
      menuTitle: 'Pork Sisig',
      menuCategory: 'Sizzling',
      menuPrice: 450
    },
    {
      id: 15,
      menuImage: Menu15,
      menuTitle: 'Beef Sisig',
      menuCategory: 'Sizzling',
      menuPrice: 480
    },
    {
      id: 16,
      menuImage: Menu16,
      menuTitle: 'Chicken Sisig',
      menuCategory: 'Sizzling',
      menuPrice: 420
    },

    {
      id: 17,
      menuImage: Menu17,
      menuTitle: 'Cucumber Juice',
      menuCategory: 'Beverages',
      menuPrice: 120
    },
    { id: 18, menuImage: Menu18, menuTitle: 'Iced Tea', menuCategory: 'Beverages', menuPrice: 100 },
    {
      id: 19,
      menuImage: Menu19,
      menuTitle: 'Calamansi Juice',
      menuCategory: 'Beverages',
      menuPrice: 120
    },
    { id: 20, menuImage: Menu20, menuTitle: 'Coke', menuCategory: 'Beverages', menuPrice: 80 },
    { id: 21, menuImage: Menu21, menuTitle: 'Sprite', menuCategory: 'Beverages', menuPrice: 80 },
    {
      id: 22,
      menuImage: Menu22,
      menuTitle: 'Bottled Water',
      menuCategory: 'Beverages',
      menuPrice: 50
    },

    {
      id: 23,
      menuImage: Menu23,
      menuTitle: 'Pork Samgyupsal',
      menuCategory: 'Samgyupsal',
      menuPrice: 500
    },
    {
      id: 24,
      menuImage: Menu24,
      menuTitle: 'Beef Samgyupsal',
      menuCategory: 'Samgyupsal',
      menuPrice: 550
    },

    { id: 25, menuImage: Menu25, menuTitle: 'Plain Rice', menuCategory: 'AddOns', menuPrice: 1990 },
    { id: 26, menuImage: Menu26, menuTitle: 'Garlic Rice', menuCategory: 'AddOns', menuPrice: 120 },
    { id: 27, menuImage: Menu27, menuTitle: 'Kimchi', menuCategory: 'AddOns', menuPrice: 120 },
    { id: 28, menuImage: Menu28, menuTitle: 'Cheese Dip', menuCategory: 'AddOns', menuPrice: 150 },
    {
      id: 29,
      menuImage: Menu29,
      menuTitle: 'Pork Samgyupsal',
      menuCategory: 'AddOns',
      menuPrice: 150
    },
    {
      id: 30,
      menuImage: Menu30,
      menuTitle: 'Beef Samgyupsal',
      menuCategory: 'Others',
      menuPrice: 150
    }
  ]
  const uniqueCategories = ['All', ...new Set(menuItems.map((item) => item.menuCategory))]

  const CATEGORIES = uniqueCategories.sort((a, b) => {
    if (a === 'All') return -1
    if (b === 'All') return 1
    return a.localeCompare(b)
  })

  const cartCount = useMemo(() => Object.values(cart).reduce((sum, qty) => sum + qty, 0), [cart])

  const filteredItems = useMemo(() => {
    const q = search.trim().toLowerCase()

    return menuItems.filter((item) => {
      const matchCategory = activeCategory === 'All' ? true : item.menuCategory === activeCategory

      const matchSearch = !q
        ? true
        : item.menuTitle.toLowerCase().includes(q) || item.menuCategory.toLowerCase().includes(q)

      return matchCategory && matchSearch
    })
  }, [menuItems, activeCategory, search])
  const grouped = useMemo(() => {
    const map = new Map()
    for (const item of filteredItems) {
      const key = item.menuCategory
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(item)
    }

    const ordered = []
    for (const c of CATEGORIES) {
      if (c === 'All') continue
      if (map.has(c)) ordered.push([c, map.get(c)])
    }
    return ordered
  }, [filteredItems])

  function placeOrder() {
    setOrdersOpen(false)

    setOrderConfirmed(true)

    setCart({})
  }

  const cartLines = useMemo(() => {
    const lines = []
    for (const item of menuItems) {
      const qty = cart[item.id] || 0
      if (qty > 0) {
        lines.push({
          ...item,
          qty,
          lineTotal: qty * item.menuPrice
        })
      }
    }
    return lines
  }, [cart, menuItems])

  const cartTotal = useMemo(() => cartLines.reduce((sum, l) => sum + l.lineTotal, 0), [cartLines])
  const inc = (id) => {
    setCart((p) => ({ ...p, [id]: (p[id] || 0) + 1 }))
    setShowAnimation(true)
    setItemID(id)
    setTimeout(() => {
      setShowAnimation(false)
      setItemID(null)
    }, 600)
  }
  const dec = (id) =>
    setCart((p) => {
      const next = { ...p }
      const cur = next[id] || 0
      if (cur <= 1) delete next[id]
      else next[id] = cur - 1
      return next
    })

  return (
    <div className="bg-[#F5F5F5] font-sans">
      <main className="h-full w-full min-w-0">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-semibold text-black mb-1">MENU</h1>
            <p className="mt-2 text-sm text-gray-600"> Table Number:</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">T-1</p>
          </div>

          <button
            onClick={() => setOrdersOpen(true)}
            className="relative rounded-xl border border-purple-600 bg-purple-50 px-5 py-2 text-sm font-semibold text-purple-700 hover:bg-purple-100"
          >
            View Orders
            {cartCount > 0 ? (
              <span className="absolute -top-2 -right-2 min-w-[20px] h-[20px] px-1 rounded-full bg-purple-600 text-white text-xs flex items-center justify-center">
                {cartCount}
              </span>
            ) : null}
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
          <div className="flex flex-col gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search menu"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full max-w-sm pl-11 pr-4 py-2 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-base font-normal"
              />
            </div>

            <div className="flex gap-3 overflow-x-auto pb-2">
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={
                    activeCategory === category
                      ? 'shrink-0 px-4 py-2 rounded-xl border border-purple-600 bg-purple-50 text-purple-700 text-sm font-semibold'
                      : 'shrink-0 px-4 py-2 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-medium hover:border-purple-300 hover:text-purple-700'
                  }
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 h-[65vh] overflow-y-auto pr-2">
            {activeCategory === 'All' ? (
              <div className="space-y-8">
                {grouped.map(([category, items]) => (
                  <div key={category}>
                    <h2 className="text-lg font-semibold text-gray-900 mb-3">{category}</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                      {items.map((item) => {
                        const isAnimating = itemID === item.id && showAnimation
                        return (
                          <MenuItemCard
                            key={item.id}
                            item={item}
                            qty={cart[item.id] || 0}
                            onInc={inc}
                            onDec={dec}
                            isAnimating={isAnimating}
                          />
                        )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {filteredItems.map((item) => {
                  const qty = cart[item.id] || 0

                  return (
                    <MenuItemCard
                      key={item.id}
                      item={item}
                      qty={cart[item.id] || 0}
                      onInc={inc}
                      onDec={dec}
                    />
                  )
                })}
              </div>
            )}
          </div>
        </div>
      </main>

      {ordersOpen ? (
        <div className="fixed inset-0 z-50">
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setOrdersOpen(false)}
            aria-label="Close orders"
          />

          <aside className="absolute right-0 top-0 h-full w-full max-w-[520px] bg-white shadow-2xl rounded-l-3xl flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-start justify-between">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900">Current Order</h3>
                <p className="mt-2 text-sm text-gray-600">
                  Table Number: <span className="font-bold text-gray-900">T-1</span>
                </p>
              </div>

              <button
                onClick={() => setOrdersOpen(false)}
                className="h-10 w-10 rounded-full hover:bg-gray-100 flex items-center justify-center text-gray-700"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {cartLines.length === 0 ? (
                <p className="text-sm text-gray-600">No items yet. Add from the menu.</p>
              ) : (
                <div className="space-y-4">
                  {cartLines.map((line) => (
                    <div key={line.id} className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3 min-w-0">
                        <div className="h-14 w-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                          <img
                            src={line.menuImage}
                            alt={line.menuTitle}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-gray-900 truncate">{line.menuTitle}</p>
                          <p className="text-sm text-gray-500">{line.menuCategory}</p>
                          <p className="text-sm text-gray-700">{formatPHP(line.menuPrice)}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => dec(line.id)}
                          className="h-9 w-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-lg"
                        >
                          −
                        </button>
                        <div className="h-9 min-w-[44px] px-3 rounded-lg border border-gray-200 flex items-center justify-center font-semibold">
                          {line.qty}
                        </div>
                        <button
                          onClick={() => inc(line.id)}
                          className="h-9 w-9 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-800 text-lg"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-6 border-t border-gray-100">
              <div className="flex items-end justify-between">
                <p className="text-3xl font-semibold text-gray-900">Total:</p>
                <p className="text-3xl font-semibold text-gray-900">{formatPHP(cartTotal)}</p>
              </div>

              <button
                className="mt-5 w-full h-12 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700 disabled:bg-gray-300"
                disabled={cartLines.length === 0}
                onClick={placeOrder}
              >
                Place Order
              </button>
            </div>
          </aside>
        </div>
      ) : null}
      {orderConfirmed ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <button
            className="absolute inset-0 bg-black/40"
            onClick={() => setOrderConfirmed(false)}
            aria-label="Close confirmation"
          />

          <div className="relative w-[92%] max-w-[420px] rounded-3xl bg-white p-6 shadow-2xl">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
              <img src={check} alt="Checkmark" className="h-14 w-14" />
            </div>

            <p className="mt-4 text-center text-lg font-semibold text-gray-900">Order Confirmed</p>

            <button
              onClick={() => setOrderConfirmed(false)}
              className="mt-6 w-full h-12 rounded-xl bg-purple-600 text-white font-semibold hover:bg-purple-700"
            >
              Done
            </button>
          </div>
        </div>
      ) : null}
    </div>
  )
}
