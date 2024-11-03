'use client';

import { useState } from 'react';
import { useSearchParams } from 'next/navigation'
import { editGradeFormAction } from '@/app/utils/serverActions';
import { useFormState, useFormStatus } from 'react-dom';
import type { ExamGrade } from '@/app/utils/types';

export default function Page() {	
	const params = useSearchParams();
	const gradeID = params.get('id') ?? "NO-ID?";
	const subject = params.get('subject') ?? "";
	const grade = params.get('grade') ?? "";
    const signed = params.get('signed') ?? "";

    const [calificaciones, setCalificaciones] = useState<ExamGrade[]>([]);

	return ( <section className="mt-2 flex content-center justify-center">
		<section className="flex flex-col justify-center max-w-md border border-black p-4 rounded">
			<h1>Editar calificacion:</h1>
			<p> ID: { gradeID } </p>
			<form action={editGradeFormAction} className="flex flex-col">
				<input type="hidden" name="id" value={gradeID} />

				<div className="mt-4"></div>

                <label htmlFor="studentID">ID de alumno</label>
				<input required className="input input-bordered w-full max-w-xs"
					   type="text" name="studentID" defaultValue={subject} id="studentIDInput" />
				<div className="mt-4"></div>
				
				<label htmlFor="subject">Materia</label>
				<input required className="input input-bordered w-full max-w-xs"
					   type="text" name="subject" defaultValue={subject} id="subjectInput" />
				<div className="mt-4"></div>

                <label htmlFor="grade">Nota</label>
				<input required className="input input-bordered w-full max-w-xs"
					   type="text" name="grade" defaultValue={grade} id="gradeInput" />
				<div className="mt-4"></div>

                <label htmlFor="signed">Firmado</label>
				<input required className="input input-bordered w-full max-w-xs"
					   type="text" name="signed" defaultValue={signed} id="signedInput" />
				<div className="mt-4"></div>

				<SubmitButton />
			</form>
		</section>
	</section>);
}

function SubmitButton() {
	const { pending } = useFormStatus();
	return <input disabled={pending} aria-disabled={pending} type="submit" value="Editar"
			className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500 active:bg-blue-600 aria-disabled:cursor-not-allowed aria-disabled:opacity-50" />;
}