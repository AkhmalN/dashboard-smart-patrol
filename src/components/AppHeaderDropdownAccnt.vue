<script setup>
import avatar from '@/assets/images/avatars/11.jpg'
import { useAuthStore } from '../stores/auth'
import router from '../router'

const authStore = useAuthStore()

async function handleLogout() {
  localStorage.removeItem('user')
  authStore.user = null
  router.push('/auth/login')
}
</script>

<template>
  <CDropdown placement="bottom-end" variant="nav-item">
    <CDropdownToggle class="py-0 pe-0" :caret="false">
      <CAvatar :src="avatar" size="md" />
    </CDropdownToggle>
    <CDropdownMenu class="pt-0">
      <CDropdownHeader
        component="h6"
        class="bg-body-secondary text-body-secondary fw-semibold mb-2"
      >
        Settings
      </CDropdownHeader>
      <CDropdownItem> <CIcon icon="cil-user" /> Profile </CDropdownItem>
      <CDropdownDivider />
      <CDropdownItem @click="handleLogout"> <CIcon icon="cil-lock-locked" /> Logout </CDropdownItem>
    </CDropdownMenu>
  </CDropdown>
</template>
