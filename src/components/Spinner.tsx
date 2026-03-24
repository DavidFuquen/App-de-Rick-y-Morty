function Spinner() {
  return (
    <div className="flex flex-col justify-center items-center py-20 gap-4">
      <div className="w-14 h-14 border-4 border-green-400 border-t-transparent rounded-full animate-spin" />
      <p className="text-green-400 text-sm animate-pulse">Cargando...</p>
    </div>
  )
}

export default Spinner