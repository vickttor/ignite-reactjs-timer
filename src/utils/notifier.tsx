import { toast } from 'react-toastify'

interface NotifyBodyProps {
  title: string
  body: string
  icon: string
}

export const Notifyer = {
  async init() {
    if (!('Notification' in window)) {
      toast.info('Browser does not support desktop notification')
    } else {
      const permission = await Notification.requestPermission()

      if (permission !== 'granted') {
        toast.info('Permission denied')
      }
    }
  },

  notify({ title, body, icon }: NotifyBodyProps) {
    return () =>
      new Notification(title, {
        body,
        icon,
      })
  },
}
