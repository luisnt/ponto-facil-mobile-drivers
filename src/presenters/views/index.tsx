import { AgentControllerTest, MobileControllerTest, WhatsAppControllerTest } from "@/presenters/tests";
import React, { useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";

type TInputState = { label: string, value: unknown }
type TState = { label: string, value: string }
type TStates = TState[]

export default function Index() {
  const [data, setData] = useState<TStates>([]);

  const changeData = ({ label, value }: TInputState) => setData(state => [...state, { label, value: JSON.stringify(value, null, 2) }]);

  useEffect(() => {
    setData([])
      ; (async () => {
        let label: string
        let value: string

        // state = DbTestService()
        // setName(`Registro 7: ${await state}`)

        // state = ApiTestService()
        // setName(`Api Result: ${await state}`)

        label = "MobileControllerTest.Login"
        value = await MobileControllerTest()
        changeData({ label, value })

          ; (await AgentControllerTest()).Open()

        label = "AgentControllerTest.Settings"
        value = await (await AgentControllerTest()).Settings()
        changeData({ label, value })

        label = "AgentControllerTest.RepService"
        value = await (await AgentControllerTest()).RepService()
        changeData({ label, value })

        label = "AgentControllerTest.SendAfd"
        value = await (await AgentControllerTest()).SendAfd()
        changeData({ label, value })

          ; (await AgentControllerTest()).Close()

        label = "WhatsAppControllerTest.Message"
        value = await WhatsAppControllerTest()
        changeData({ label, value })
      })()
  }, [])

  return (
    <View style={{ flex: 1, margin: 10, padding: 10, gap: 10, rowGap: 10, backgroundColor: "#ccc", }}   >
      <Text>App 1.1</Text>
      <ScrollView style={{ flex: 1, overflowY: "scroll", gap: 10, rowGap: 10, borderRadius: 5 }}>
        {data.map(({ label, value }, Index) => (
          <View key={Index} style={{ flexDirection: "row", marginVertical: 10, backgroundColor: "#fff", borderRadius: 5 }}>
            <View key={Index} style={{ flex: 1 }}>
              <Text style={{
                fontWeight: "bold", backgroundColor: "#e9e9e9ff", padding: 5, borderRadius: 5
              }}>{label}</Text>
              <Text style={{ fontFamily: "monospace" }}>{value}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
      <Text>\src\presenters\views\index.tsx</Text>
    </View>
  )
}
