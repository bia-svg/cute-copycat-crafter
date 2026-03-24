import ServicePage from "@/pages/ServicePage";
import { smokingData, anxietyData, weightData, stressData, depressionData, childrenData, adultsData } from "@/data/services";

export function SmokingPage() { return <ServicePage data={smokingData} />; }
export function AnxietyPage() { return <ServicePage data={anxietyData} />; }
export function WeightPage() { return <ServicePage data={weightData} />; }
export function StressPage() { return <ServicePage data={stressData} />; }
export function DepressionPage() { return <ServicePage data={depressionData} />; }
export function ChildrenPage() { return <ServicePage data={childrenData} />; }
export function AdultsPage() { return <ServicePage data={adultsData} />; }
