import { create } from 'zustand'

// Demo wardrobe items
const DEMO_ITEMS = {
  tops: [
    { id: 't1', name: 'Silk Blouse', brand: 'Zara', color: '#f9a8d4', image: null, category: 'tops', emoji: '👚' },
    { id: 't2', name: 'Striped Tee', brand: 'H&M', color: '#93c5fd', image: null, category: 'tops', emoji: '👕' },
    { id: 't3', name: 'Beige Trench Coat', brand: 'Burberry', color: '#d4b896', image: null, category: 'tops', emoji: '🧥' },
    { id: 't4', name: 'Crop Jacket', brand: 'Mango', color: '#6ee7b7', image: null, category: 'tops', emoji: '🥻' },
  ],
  bottoms: [
    { id: 'b1', name: 'High-Rise Jeans', brand: 'Levi\'s', color: '#3b82f6', image: null, category: 'bottoms', emoji: '👖' },
    { id: 'b2', name: 'Pleated Skirt', brand: 'Zara', color: '#fca5a5', image: null, category: 'bottoms', emoji: '👗' },
    { id: 'b3', name: 'Linen Trousers', brand: 'COS', color: '#d6d3d1', image: null, category: 'bottoms', emoji: '🩳' },
    { id: 'b4', name: 'Mini Skirt', brand: 'ASOS', color: '#c084fc', image: null, category: 'bottoms', emoji: '👗' },
  ],
  shoes: [
    { id: 's1', name: 'White Sneakers', brand: 'Nike', color: '#f5f5f4', image: null, category: 'shoes', emoji: '👟' },
    { id: 's2', name: 'Strappy Heels', brand: 'Steve Madden', color: '#d4b896', image: null, category: 'shoes', emoji: '👠' },
    { id: 's3', name: 'Chelsea Boots', brand: 'Dr. Martens', color: '#292524', image: null, category: 'shoes', emoji: '👢' },
    { id: 's4', name: 'Platform Mules', brand: 'Mango', color: '#fbbf24', image: null, category: 'shoes', emoji: '👡' },
  ],
  accessories: [
    { id: 'a1', name: 'Bucket Hat', brand: 'Kangol', color: '#86efac', image: null, category: 'accessories', emoji: '🧢' },
    { id: 'a2', name: 'Pearl Necklace', brand: 'Mejuri', color: '#f8fafc', image: null, category: 'accessories', emoji: '📿' },
    { id: 'a3', name: 'Leather Bag', brand: 'Coach', color: '#b45309', image: null, category: 'accessories', emoji: '👜' },
    { id: 'a4', name: 'Sunglasses', brand: 'Ray-Ban', color: '#292524', image: null, category: 'accessories', emoji: '🕶️' },
  ],
}

const DEMO_LOOKS = [
  { id: 'l1', name: 'Date Night 🌙', items: ['t1', 'b2', 's2', 'a2'] },
  { id: 'l2', name: 'Weekend Vibes ☀️', items: ['t2', 'b1', 's1', 'a1'] },
  { id: 'l3', name: 'Office Chic 💼', items: ['t3', 'b3', 's3', 'a3'] },
  { id: 'l4', name: 'Street Style 🔥', items: ['t4', 'b4', 's4', 'a4'] },
]

export const useWardrobeStore = create((set, get) => ({
  // Auth
  user: null,
  isGuest: false,
  setUser: (user) => set({ user }),
  setGuest: () => set({ isGuest: true, user: null }),
  signOut: () => set({ user: null, isGuest: false }),

  // Scene state
  currentView: 'landing', // 'landing' | 'closet'
  enterCloset: () => set({ currentView: 'closet' }),

  // Wardrobe items
  items: { ...DEMO_ITEMS },
  activeCategory: 'tops',
  setActiveCategory: (cat) => set({ activeCategory: cat }),
  addItem: (item) => set((state) => ({
    items: {
      ...state.items,
      [item.category]: [...state.items[item.category], item],
    },
  })),

  // Outfit / try-on
  currentOutfit: { top: null, bottom: null, shoes: null, accessory: null },
  tryOnItem: (item) => {
    const slotMap = { tops: 'top', bottoms: 'bottom', shoes: 'shoes', accessories: 'accessory' }
    const slot = slotMap[item.category]
    set((state) => ({
      currentOutfit: { ...state.currentOutfit, [slot]: item },
    }))
  },
  clearOutfit: () => set({ currentOutfit: { top: null, bottom: null, shoes: null, accessory: null } }),

  // Selected item detail
  selectedItem: null,
  setSelectedItem: (item) => set({ selectedItem: item }),

  // Saved looks
  savedLooks: [...DEMO_LOOKS],
  saveLook: (name) => {
    const { currentOutfit, savedLooks } = get()
    const items = Object.values(currentOutfit).filter(Boolean).map(i => i.id)
    if (items.length === 0) return
    const newLook = { id: `l${Date.now()}`, name, items }
    set({ savedLooks: [...savedLooks, newLook] })
  },
  applyLook: (look) => {
    const { items } = get()
    const allItems = Object.values(items).flat()
    const outfit = { top: null, bottom: null, shoes: null, accessory: null }
    const slotMap = { tops: 'top', bottoms: 'bottom', shoes: 'shoes', accessories: 'accessory' }
    look.items.forEach(id => {
      const item = allItems.find(i => i.id === id)
      if (item) outfit[slotMap[item.category]] = item
    })
    set({ currentOutfit: outfit })
  },

  // UI state
  isDrawerOpen: false,
  toggleDrawer: () => set((state) => ({ isDrawerOpen: !state.isDrawerOpen })),
  isUploadModalOpen: false,
  toggleUploadModal: () => set((state) => ({ isUploadModalOpen: !state.isUploadModalOpen })),
  isLoading: true,
  setLoading: (v) => set({ isLoading: v }),
}))
