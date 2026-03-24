interface CardProps {
  image?: string
  title: string
  subtitle?: string
  badge?: string
  badgeColor?: string
  details?: { label: string; value: string }[]
  onClick?: () => void
}

function Card({ image, title, subtitle, badge, badgeColor = 'bg-green-500', details, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={`
        bg-[#13192e] border border-gray-800 rounded-2xl overflow-hidden
        transition-all duration-300
        hover:border-green-500 hover:shadow-lg hover:shadow-green-900/40 hover:scale-105
        ${onClick ? 'cursor-pointer' : ''}
      `}
    >
      {/* Imagen */}
      {image && (
        <div className="relative">
          <img src={image} alt={title} className="w-full h-48 object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#13192e] to-transparent" />
        </div>
      )}

      <div className="p-4">

        {/* Badge */}
        {badge && (
          <span className={`text-xs font-bold px-3 py-1 rounded-full text-white ${badgeColor}`}>
            {badge}
          </span>
        )}

        {/* Título */}
        <h2 className="text-white font-bold text-lg mt-2 leading-tight">{title}</h2>

        {/* Subtítulo */}
        {subtitle && (
          <p className="text-green-400 text-sm mt-1">{subtitle}</p>
        )}

        {/* Detalles */}
        {details && details.length > 0 && (
          <ul className="mt-3 space-y-1 border-t border-gray-700 pt-3">
            {details.map((detail) => (
              <li key={detail.label} className="text-sm flex justify-between">
                <span className="text-gray-500">{detail.label}</span>
                <span className="text-gray-300">{detail.value}</span>
              </li>
            ))}
          </ul>
        )}

      </div>
    </div>
  )
}

export default Card