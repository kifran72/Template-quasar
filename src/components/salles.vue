<template>
  <q-page padding>
    <div class="q-pa-md q-gutter-md">
      <h2>Salles</h2>
      <q-btn label="Ajoutez une salle" @click="addEvent(event)" />
    </div>
    <div class="q-pa-md row items-start q-gutter-md">
      <q-card
        v-for="salle in salles"
        :key="salle.id"
        class="bg-blue text-white"
      >
        <q-card-section style="max-width: 80vw">
          <div class="text-h6">{{ salle.data.name }}</div>
          <div class="text-subtitle2">{{ salle.data.sport }}</div>
        </q-card-section>

        <q-card-actions>
          <q-btn label="Modifier" @click="modifyEvent(salle)" flat />
          <q-btn label="Supprimer" @click="removeEvent(salle)" flat />
        </q-card-actions>
      </q-card>

      <!-- <q-card class="bg-green text-white">
      <q-card-actions>
        <q-btn label="Ajouter une tâche" @click="add = true" flat />
      </q-card-actions>
    </q-card> -->

      <!-- <q-dialog v-model="add">
        <q-card style="width: 500px; max-width: 80vw">
          <q-form @submit="addInlist()" class="q-gutter-md">
            <q-card-section>
              <div class="text-h6">Ajouter une tâche a votre liste</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <div class="q-gutter-y-md column">
                <q-input
                  maxlength="25"
                  counter
                  autogrow
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0 && val !== ' ') ||
                      'Veuillez entrer un titre',
                  ]"
                  filled
                  v-model="item.titre"
                  label="Titre"
                />
                <q-input
                  autogrow
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0 && val !== ' ') ||
                      'Veuillez entrer un commentaire',
                  ]"
                  filled
                  v-model="item.description"
                  label="Description"
                />
              </div>
            </q-card-section>

            <q-card-actions align="right">
              <q-btn flat label="Ajouter" type="submit" color="primary" />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog> -->
    </div>
  </q-page>
</template>

<style></style>

<script>
import { useMeta, useQuasar } from "quasar";
import { auth, onAuthStateChanged } from "../utils/auth/google";
import {
  addSalle,
  getSalles,
  // modifySalle,
  deleteSalle,
} from "../utils/db/salles";

const metaData = {
  // sets document title
  title: "Salles",
  // optional; sets final title as "Index Page - My Website", useful for multiple level meta
  // titleTemplate: title => `${title} - My Website`,

  // meta tags
  meta: {
    // description: { name: "description", content: "Page 1" },
    // keywords: { name: "keywords", content: "Quasar website" },
    equiv: {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    },
    // note: for Open Graph type metadata you will need to use SSR, to ensure page is rendered by the server
    ogTitle: {
      property: "og:title",
      // optional; similar to titleTemplate, but allows templating with other meta properties
      template(ogTitle) {
        return `${ogTitle}`;
      },
    },
  },

  // CSS tags
  link: {
    material: {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/icon?family=Material+Icons",
    },
  },

  // JS tags
  script: {
    ldJson: {
      type: "application/ld+json",
      innerHTML: `{ "@context": "http://schema.org" }`,
    },
  },

  // <html> attributes
  htmlAttr: {
    "xmlns:cc": "http://creativecommons.org/ns#", // generates <html xmlns:cc="http://creativecommons.org/ns#">,
    empty: undefined, // generates <html empty>
  },

  // <body> attributes
  bodyAttr: {
    "action-scope": "xyz", // generates <body action-scope="xyz">
    empty: undefined, // generates <body empty>
  },

  // <noscript> tags
  noscript: {
    default: "This is content for browsers with no JS (or disabled JS)",
  },
};
export default {
  name: "Salles",
  methods: {
    async addEvent(event) {
      const salles = await addSalle(event);
      if (salles) {
        this.salles.push(salles);
      }
      this.showNotif(
        "La salle " + event.name + " a été crée !",
        "green",
        "bottom-right"
      );
    },
    modifyEvent(event) {
      // this.salles = this.salles.filter((salle) => salle.id !== event.id);
      // modifySalle(event);
      this.showNotif(
        "La salle " + event.name + " a été modifié !",
        "green",
        "bottom-right"
      );
    },
    removeEvent(event) {
      deleteSalle(event);

      this.salles = this.salles.filter((salle) => salle.id !== event.id);
      this.showNotif(
        "La salle " + event.data.name + " a été supprimé !",
        "green",
        "bottom-right"
      );
    },
  },
  data() {
    return {
      salles: [],
      event: {
        name: "",
        sport: "",
        user: { uid: "", displayName: "", email: "" },
      },
    };
  },
  async mounted() {
    const salles = await getSalles();
    if (salles) {
      this.salles = salles;
    }
    onAuthStateChanged(auth, (user) => {
      if (!user) {
        this.$router.push("/");
      } else {
        this.event.name = "test";
        this.event.sport = "Tennis";
        this.event.user.uid = user.uid;
        this.event.user.displayName = user.displayName;
        this.event.user.email = user.email;
      }
    });
  },
  setup() {
    const $q = useQuasar();
    useMeta(metaData);

    return {
      showNotif(message, color, position) {
        $q.notify({
          message: message,
          color: color,
          position: position,
        });
      },
    };
  },
};
</script>
