export function formatCurrency(amountStr: string, currencyCode: string, locale = 'en-ES'): string {
  try {
    const number = Number(amountStr)
    if (isNaN(number)) {
      return 'NaN'
    }

    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currencyCode,
    }).format(number)
  } catch {
    return 'Format Error'
  }
}
