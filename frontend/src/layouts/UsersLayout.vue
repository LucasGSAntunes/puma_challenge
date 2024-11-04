<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-black-nav text-white">
      <q-toolbar class="row justify-between q-px-lg q-py-md">
        <div class="row items-center q-px-lg">
          <q-avatar>
            <img src="/git_logo.png">
          </q-avatar>
          <div class="q-px-lg">
            <h1 class="text-h6 text-bold">GitHub</h1>
          </div>
        </div>
        <div class="q-px-md">
          <h1 class="text-h6 text-bold">PUMA - CHALLENGE</h1>
        </div>
        <div class="q-px-md row items-center">
          <h1 class="text-caption">powered by Lucas Antunes</h1>
        </div>
      </q-toolbar>
      <div class="w100 row justify-center items-center">
        <div class="bg-white" style="width:95%;height:1px"></div>
      </div>
    </q-header>

    <section id="home" class="bg-black text-white q-pt-xl" style="height: 140vh;">
      <div class="text-center text-h4 q-mt-xl q-pa-xl">
        Novo Favorito
        <div class="w100 row justify-center items-center">
        <div class="bg-white" style="width:5%;height:1px"></div>
      </div>
      </div>
      <div class="row justify-center q-mb-xl">
        <q-input outlined v-model="formSearch" class="q-mt-md q-pa-sm rounded-borders bg-white" style="width: 30%;"
          placeholder="Digite um nome de usuário do GitHub" input-class="text-h6 text-bold text-center" />
        <q-btn class="q-mt-md q-ml-md" color="primary" text-color="white" style="width: 15%; padding: 8px 24px;"
          @click="addUser" :disabled="formSearch === ''">
          <span class="text-caption">Adicionar Usuário</span>
          <q-icon name="person_add" size="18px" class="q-ml-xs" />
        </q-btn>
      </div>
      <div class="w100 row justify-center items-center">
        <div class="bg-white" style="width:90%;height:1px"></div>
      </div>
      <div v-if="user_exists" class="row justify-center q-mt-xl">
        <div class="row justify-between q-mt-md" style="min-width: 70%;">
          <h3 class="text-h6 text-bold">Usuários Favoritos</h3>
          <q-btn color="secondary" text-color="white" @click="sortUsers">
            <span class="text-caption">Ordenar por Nome</span>
            <q-icon name="sort_by_alpha" size="18px" class="q-ml-xs" />
          </q-btn>
        </div>
        <q-card v-if="!loading" class="q-mt-md" style="min-width: 70%;">
          <q-card-section>
            <q-list>
              <q-item v-for="user in users" :key="user.user.id" clickable class="row justify-between">
                <q-item-section side>
                  <q-btn flat round color="gold" @click="toggleStar(user.user.username)" class="star-button">
                    <q-icon :name="user.user.starred ? 'star' : 'star_border'" color="gold" />
                  </q-btn>
                </q-item-section>

                <q-item-section avatar>
                  <q-avatar>
                    <img :src="user.user.avatar" :alt="`Avatar of ${user.user.name}`">
                  </q-avatar>
                </q-item-section>

                <q-item-section class="text-black">
                  <q-item-label>{{ user.user.name }}</q-item-label>
                  <q-item-label caption>@{{ user.user.username }}</q-item-label>
                </q-item-section>

                <q-item-section side class="row justify-end no-wrap">
                  <q-btn flat color="primary" :href="user.user.url" target="_blank" class="q-ml-sm">
                    <span class="text-caption">Ver Perfil</span>
                    <q-icon name="launch" size="18px" class="q-ml-xs" />
                  </q-btn>

                  <q-btn flat color="negative" @click="removeUser(user.user.username)" class="q-ml-sm">
                    <span class="text-caption">Remover</span>
                    <q-icon name="delete" size="18px" class="q-ml-xs" />
                  </q-btn>
                </q-item-section>

              </q-item>
            </q-list>
          </q-card-section>
        </q-card>

        <q-card v-if="loading" flat class="q-mt-md text-center">
          <q-card-section>
            <q-spinner color="primary" size="50px" />
            <div class="text-h6 text-bold q-mt-md">Carregando...</div>
          </q-card-section>
        </q-card>
        <div class="w100 row justify-center items-center q-mt-xl">
          <div class="bg-white" style="width:90%;height:1px"></div>
        </div>
      </div>

    </section>
  </q-layout>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue';
import { useQuasar } from 'quasar';
import { api } from '../boot/axios';

const user_exists = ref(false);
const $q = useQuasar();
const loading = ref(false);
const formSearch = ref('');
const users = ref([]);

onBeforeMount(() => {
  getUsers();
});

async function addUser() {
  loading.value = true;
  const body = { username: formSearch.value };

  try {
    const response = await api.post(`/users`, body);
    if (response.status !== 201) {
      throw new Error();
    }

    formSearch.value = '';
    user_exists.value = true;
    await getUsers();
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Usuário adicionado com sucesso!'
    });
  } catch (error) {
    console.log(error);
    if (error.response && error.response.status === 409) {
      $q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Usuário já existe!'
      });
    } else if (error.response && error.response.status === 400) {
      $q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Máximo de usuários favoritos atingido!'
      });
    } else if (error.response && error.response.status === 404) {
      $q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Usuário não encontrado!'
      });
    } else {
      $q.notify({
        color: 'red-4',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Erro ao adicionar usuário!'
      });
    }
  } finally {
    loading.value = false;
  }
}

async function removeUser(username) {
  loading.value = true;
  try {
    await api.delete(`/users/${username}`);
    await getUsers();
    $q.notify({
      color: 'green-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Usuário removido com sucesso!'
    });
  } catch (error) {
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'cloud_done',
      message: 'Erro ao remover usuário!'
    });
  } finally {
    loading.value = false;
  }
}

async function toggleStar(username) {
  loading.value = true;
  try {
    const currentUser = users.value.find(user => user.user.username === username);
    const wasStarred = currentUser && currentUser.user.starred;

    const res = await api.patch(`/users/${username}/toggle_star`);
    if (res.status === 200) {
      await getUsers();
      const isStarred = res.data.starred;
      const message = wasStarred ?
        'Usuário desfavoritado com sucesso!' :
        'Usuário favoritado com sucesso!';
      const color = !wasStarred ? 'green-4' : 'red-4';
      const icon = isStarred ? 'star' : 'star_border';

      $q.notify({
        color: color,
        textColor: 'white',
        icon: icon,
        message: message,
        timeout: 2000
      });
    } else {
      throw new Error();
    }
  } catch (error) {
    console.log(error);
    $q.notify({
      color: 'red-4',
      textColor: 'white',
      icon: 'error',
      message: 'Erro ao favoritar/desfavoritar usuário!',
      timeout: 2000
    });
  } finally {
    loading.value = false;
    sortUsers();
  }
}

function sortUsers() {
  users.value.sort((a, b) => {
    const nameA = a.user.name || 'zzzDesconhecido';
    const nameB = b.user.name || 'zzzDesconhecido';

    if (a.user.starred === b.user.starred) {
      return nameA.localeCompare(nameB);
    }
    return a.user.starred ? -1 : 1;
  });
}



async function getUsers() {
  loading.value = true;
  try {
    const response = await api.get(`/users`);
    users.value = response.data;
    user_exists.value = users.value.length > 0;
  } catch (error) {
    console.log(error);
  } finally {
    loading.value = false;
  }
}

</script>

<style scoped>

.bg-black-nav {
  background-color: #00000046;
  backdrop-filter: blur(8px);
}
</style>
