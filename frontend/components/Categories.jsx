function Categories({ selectedCategory, setSelectedCategory }) {
  try {
    const categories = [
      {
        id: 'smartphones',
        name: 'Smartphones',
        icon: 'smartphone',
        count: '2,450+',
        image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300',
        description: 'Latest flagship and budget smartphones'
      },
      {
        id: 'laptops',
        name: 'Laptops',
        icon: 'laptop',
        count: '1,200+',
        image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=300',
        description: 'Gaming, business, and ultrabooks'
      },
      {
        id: 'headphones',
        name: 'Headphones',
        icon: 'headphones',
        count: '850+',
        image: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=300',
        description: 'Wireless, noise-canceling, and studio'
      },
      {
        id: 'tablets',
        name: 'Tablets',
        icon: 'tablet',
        count: '650+',
        image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300',
        description: 'iPad, Android, and 2-in-1 devices'
      },
      {
        id: 'smartwatch',
        name: 'Smartwatches',
        icon: 'watch',
        count: '400+',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300',
        description: 'Fitness trackers and smart wearables'
      },
      {
        id: 'cameras',
        name: 'Cameras',
        icon: 'camera',
        count: '300+',
        image: 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300',
        description: 'DSLR, mirrorless, and action cameras'
      }
    ];

    return (
      <section id="categories" className="py-16 bg-gray-50" data-name="categories" data-file="components/Categories.jsx">
        <div className="max-w-[1400px] w-[95%] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
              Browse by Category
            </h2>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
              Explore our curated selection of electronic gadgets across different categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map(category => (
              <div
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`card cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${
                  selectedCategory === category.id ? 'ring-2 ring-[var(--primary-color)]' : ''
                }`}
              >
                <div className="relative overflow-hidden rounded-lg mb-4">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-40 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                    <div className={`icon-${category.icon} text-4xl text-white`}></div>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold text-[var(--text-primary)] mb-2">
                  {category.name}
                </h3>
                
                <p className="text-[var(--text-secondary)] mb-3">
                  {category.description}
                </p>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[var(--primary-color)]">
                    {category.count} products
                  </span>
                  <div className="icon-arrow-right text-[var(--text-secondary)]"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } catch (error) {
    console.error('Categories component error:', error);
    return null;
  }
}

export default Categories;