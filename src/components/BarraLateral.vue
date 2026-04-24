<script setup lang="ts">
</script>

<template>
    <aside class="sidebar">
        <div class="sidebar__logo">
            <img src="../assets/logo.png" alt="Logo">
        </div>

        <nav class="sidebar__nav">
            <router-link to="/" class="sidebar__link">
                <font-awesome-icon icon="list-check" class="sidebar__icon" />
                <span>Tarefas</span>
            </router-link>
            <router-link to="/projetos" class="sidebar__link">
                <font-awesome-icon icon="diagram-project" class="sidebar__icon" />
                <span>Projetos</span>
            </router-link>
        </nav>

        <div class="sidebar__footer">
            <button class="sidebar__theme-btn" @click="$emit('alternar-tema')">
                <font-awesome-icon icon="circle-half-stroke" />
                <span>Alternar Tema</span>
            </button>
        </div>
    </aside>
</template>

<style scoped>
.sidebar {
    display: flex;
    flex-direction: column;
    background: #0d3b66;
    width: 100%;
    height: 100vh;
    padding: 0;
    overflow: hidden;
}

.sidebar__logo {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2rem 1.5rem;
    border-bottom: 1px solid #1a4a72;
}

.sidebar__logo img {
    max-width: 140px;
    width: 100%;
}

.sidebar__nav {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
    padding: 1.5rem 1rem;
    flex: 1;
}

.sidebar__link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.75rem 1rem;
    border-radius: 8px;
    color: #a8c0d6;
    text-decoration: none;
    font-size: 0.95rem;
    font-weight: 500;
    transition: background 0.2s ease, color 0.2s ease;
}

.sidebar__link:hover {
    background: #1e4f7a;
    color: #ffffff;
}

.sidebar__link.router-link-exact-active {
    background: #235880;
    color: #ffffff;
    font-weight: 600;
}

.sidebar__icon {
    width: 1.1rem;
    text-align: center;
    flex-shrink: 0;
}

.sidebar__footer {
    padding: 1rem;
    border-top: 1px solid #1a4a72;
}

.sidebar__theme-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    width: 100%;
    padding: 0.65rem 1rem;
    background: #1a4a72;
    color: #b8ccdf;
    border: 1px solid #2a5a84;
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease, color 0.2s ease;
}

.sidebar__theme-btn:hover {
    background: #235880;
    color: #ffffff;
}

@media only screen and (max-width: 768px) {
    .sidebar {
        height: auto;
        flex-direction: row;
        flex-wrap: wrap;
        padding: 0.75rem;
        gap: 0.5rem;
    }

    .sidebar__logo {
        border-bottom: none;
        padding: 0.5rem;
        flex: 0;
    }

    .sidebar__logo img {
        max-width: 80px;
    }

    .sidebar__nav {
        flex-direction: row;
        flex: 1;
        padding: 0.5rem;
        gap: 0.5rem;
    }

    .sidebar__footer {
        border-top: none;
        padding: 0.5rem;
    }
}
</style>