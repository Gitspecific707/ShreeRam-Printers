
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function WhatsAppButton() {
  // Phone in international format without plus sign
  const phone = '919782967521';
  // Prefilled welcome message (will be URL-encoded)
  const message = `Hello! 👋\nThank you for contacting ShreeRam Printers.\nHow can we help you today?`;
  const encoded = encodeURIComponent(message);
  const url = `https://wa.me/${phone}?text=${encoded}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with ShreeRam Printers on WhatsApp"
    >
      <WhatsAppIcon
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          fontSize: 50,
          color: '#25D366'
        }}
      />
    </a>
  );
}
