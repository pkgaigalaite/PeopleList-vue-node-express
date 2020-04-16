<template>
  <div class="people-container">
    <PersonComponent :person="selectedPerson"></PersonComponent>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th @click="loadPeople({orderBy:'first_name'})">Name</th>
            <th @click="loadPeople({orderBy:'last_name'})">Surname</th>
            <th @click="loadPeople({orderBy:'email'})">Email</th>
            <th @click="loadPeople({orderBy:'gender'})">Gender</th>
          </tr>
        </thead>
        <tbody>
          <tr
            :class="{'active': (person._id == selectedPerson._id)}"
            @click="clickPerson(person)"
            v-for="person in people"
            :key="person._id"
          >
            <td>{{person.first_name}}</td>
            <td>{{person.last_name}}</td>
            <td>{{person.email}}</td>
            <td>{{person.gender}}</td>
          </tr>
        </tbody>
      </table>
      <Pagination
        :currentPage="this.currentPage"
        :totalItems="this.totalItems"
        @fetch-more="fetchMore"
      ></Pagination>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import PersonComponent from "../components/PersonComponent";
import Pagination from "../components/Pagination";

export default {
  name: "PeopleComponent",
  components: {
    PersonComponent,
    Pagination
  },
  data() {
    return {
      people: [],
      currentSort: "",
      currentSortDir: "asc",
      pageSize: 10,
      currentPage: 1,
      selectedPerson: {},
      totalItems: 0
    };
  },
  async created() {
    try {
      const response = await axios.get("http://localhost:5050/router/people", {
        params: {
          pageSize: this.pageSize,
          currentPage: this.currentPage
        }
      });
      this.people = response.data.result;
      this.totalItems = response.data.total;
    } catch (err) {
      console.log(err);
    }
  },
  methods: {
    fetchMore(query) {
      let { currentPage, pageSize } = query;
      this.currentPage = currentPage;
      this.pageSize = pageSize;
      this.loadPeople(query);
    },
    async loadPeople(query) {
      let {
        currentPage = this.currentPage,
        pageSize = this.pageSize,
        orderBy = this.currentSort
      } = query;
      if (!query.currentPage && orderBy === this.currentSort) {
        this.currentSortDir = this.currentSortDir === "asc" ? "desc" : "asc";
      }
      this.currentSort = orderBy;
      try {
        const response = await axios.get(
          "http://localhost:5050/router/people",
          {
            params: {
              sortDir: this.currentSortDir,
              orderBy: this.currentSort,
              pageSize: pageSize,
              currentPage: currentPage
            }
          }
        );
        this.people = response.data.result;
        this.totalItems = response.data.total;
      } catch (err) {
        console.log(err);
      }
    },
    clickPerson(person) {
      this.selectedPerson = person;
      this.isSelected = true;
    }
  }
};
</script>

<style scoped>
.people-container {
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}

.table-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  max-width: 70%;
}

.table {
  font-family: "Trebuchet MS", Arial, Helvetica, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

.active {
  background-color: rgba(175, 76, 142, 0.6);
}

.table td,
.table th {
  border: 1px solid #ddd;
  padding: 8px;
}

.table tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table tr:nth-child(even).active {
  background-color: rgba(175, 76, 142, 0.6);
}

.table tr:hover {
  background-color: rgba(175, 76, 142, 0.3);
}

.table tr.active:hover {
  background-color: rgba(175, 76, 142, 0.6);
}

.table th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: rgb(175, 76, 142);
  color: white;
}
</style>
