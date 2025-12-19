export default defineNuxtPlugin(() => {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.15 }
  )

  onMounted(() => {
    document
      .querySelectorAll('[data-animate]')
      .forEach(el => observer.observe(el))
  })
})
