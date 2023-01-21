function formatPhoneNumber(phone: string) {
  return phone.replace(/(\d{2})(\d{2})(\d{3})(\d)/, "$1 $2 $3 $4");
}

export default formatPhoneNumber;
