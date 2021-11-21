    <template v-slot:body>
        <v-list dense color = "#E0F7FA">
          <template v-for="(item, index) in desserts">
            <v-list-item :key="index">
              <tbody>
              <tr @click="rowClick(item[index])">
                    <td v-for="h in item" :class="h.class" :key="h.value" colspan="4">
                    <span>{{h.text}}</span>
                    </td>
              </tr>
              </tbody>
            </v-list-item>
          </template>
        </v-list>
    </template>