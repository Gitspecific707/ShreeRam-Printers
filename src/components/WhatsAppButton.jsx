
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

export default function WhatsAppButton() {
  return (
    <a href="https://wa.me/919782967521" target="_blank">
      <WhatsAppIcon sx={{
        position: 'fixed',
        bottom: 20,
        right: 20,
        fontSize: 50,
        color: '#25D366'
      }} />
    </a>
  );
}
